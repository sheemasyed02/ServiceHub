import uuid
from typing import BinaryIO

import boto3
from botocore.exceptions import BotoCoreError, ClientError

from app.core.settings import settings


class StorageConfigurationError(Exception):
    """Raised when required AWS S3 configuration is missing."""


class StorageUploadError(Exception):
    """Raised when a file upload to S3 fails."""


class StorageDeleteError(Exception):
    """Raised when a file deletion from S3 fails."""


class StoragePresignedUrlError(Exception):
    """Raised when generating a presigned URL fails."""


class StorageService:
    def __init__(self) -> None:
        self._bucket = settings.aws_s3_bucket
        self._client = None

    def _validate_configuration(self) -> None:
        if not settings.aws_s3_bucket:
            raise StorageConfigurationError("AWS_S3_BUCKET is not configured.")

        if not settings.aws_access_key_id:
            raise StorageConfigurationError("AWS_ACCESS_KEY_ID is not configured.")

        if not settings.aws_secret_access_key.get_secret_value():
            raise StorageConfigurationError("AWS_SECRET_ACCESS_KEY is not configured.")

    def _get_client(self):
        self._validate_configuration()

        if self._client is None:
            self._client = boto3.client(
                "s3",
                aws_access_key_id=settings.aws_access_key_id,
                aws_secret_access_key=settings.aws_secret_access_key.get_secret_value(),
                region_name=settings.aws_region,
            )

        return self._client

    @staticmethod
    def _build_object_key(
        provider_id: uuid.UUID,
        document_type: str,
        file_extension: str,
    ) -> str:
        normalized_extension = (
            file_extension if file_extension.startswith(".") else f".{file_extension}"
        )
        normalized_document_type = document_type.strip().upper().replace(" ", "_")
        return (
            f"providers/{provider_id}/{normalized_document_type}/"
            f"{uuid.uuid4()}{normalized_extension.lower()}"
        )

    def upload_file(
        self,
        *,
        provider_id: uuid.UUID,
        document_type: str,
        file_content: bytes | BinaryIO,
        content_type: str,
        file_extension: str,
    ) -> str:
        object_key = self._build_object_key(provider_id, document_type, file_extension)

        try:
            self._get_client().put_object(
                Bucket=self._bucket,
                Key=object_key,
                Body=file_content,
                ContentType=content_type,
            )
        except StorageConfigurationError:
            raise
        except (ClientError, BotoCoreError) as exc:
            raise StorageUploadError(f"Failed to upload file to S3: {exc}") from exc

        return object_key

    def delete_file(self, object_key: str) -> None:
        if not object_key or not object_key.strip():
            raise StorageDeleteError("Object key is required.")

        try:
            self._get_client().delete_object(
                Bucket=self._bucket,
                Key=object_key,
            )
        except StorageConfigurationError:
            raise
        except (ClientError, BotoCoreError) as exc:
            raise StorageDeleteError(f"Failed to delete file from S3: {exc}") from exc

    def generate_presigned_url(self, object_key: str, expires_in: int = 3600) -> str:
        if not object_key or not object_key.strip():
            raise StoragePresignedUrlError("Object key is required.")

        if expires_in <= 0:
            raise StoragePresignedUrlError("expires_in must be greater than zero.")

        try:
            return self._get_client().generate_presigned_url(
                ClientMethod="get_object",
                Params={"Bucket": self._bucket, "Key": object_key},
                ExpiresIn=expires_in,
            )
        except StorageConfigurationError:
            raise
        except (ClientError, BotoCoreError) as exc:
            raise StoragePresignedUrlError(
                f"Failed to generate presigned URL: {exc}"
            ) from exc
