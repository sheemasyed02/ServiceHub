import uuid

from app.models.provider import Provider
from app.models.verification_history import VerificationHistory
from app.repositories.provider_repository import ProviderRepository
from app.schemas.provider import (
    ProviderApprovalRequest,
    ProviderRegistrationRequest,
    ProviderRejectionRequest,
    VerificationStatus,
)


class ProviderAlreadyExistsError(Exception):
    """Raised when a provider profile already exists for the user."""


class ProviderNotFoundError(Exception):
    """Raised when a provider profile cannot be found."""


class ProviderNotPendingError(Exception):
    """Raised when an action requires a pending provider profile."""


class InvalidProviderStateError(Exception):
    """Raised when a provider profile is in an invalid state for the action."""


class ProviderService:
    def __init__(self, repository: ProviderRepository) -> None:
        self.repository = repository

    async def validate_existing_provider(self, user_id: uuid.UUID) -> None:
        existing_provider = await self.repository.get_provider_by_user_id(user_id)
        if existing_provider is not None:
            raise ProviderAlreadyExistsError("Provider profile already exists for this user.")

    async def register_provider(
        self,
        user_id: uuid.UUID,
        data: ProviderRegistrationRequest,
    ) -> Provider:
        await self.validate_existing_provider(user_id)

        provider = await self.repository.create_provider(
            user_id=user_id,
            bio=data.bio,
            experience_years=data.experience_years,
            working_radius=data.working_radius,
            latitude=data.latitude,
            longitude=data.longitude,
        )

        await self.record_verification_history(
            provider_id=provider.id,
            admin_id=None,
            action="registered",
            remarks="Provider registration submitted.",
        )
        await self.repository.commit()
        return provider

    async def submit_verification(self, user_id: uuid.UUID) -> Provider:
        provider = await self.repository.get_provider_by_user_id(user_id)
        if provider is None:
            raise ProviderNotFoundError("Provider profile not found.")

        if provider.verification_status == VerificationStatus.APPROVED.value:
            raise InvalidProviderStateError("Provider is already approved.")

        provider.verification_status = VerificationStatus.PENDING.value

        await self.record_verification_history(
            provider_id=provider.id,
            admin_id=None,
            action="verification_submitted",
            remarks="Provider submitted profile for verification.",
        )
        await self.repository.commit()
        return provider

    async def approve_provider(
        self,
        provider_id: uuid.UUID,
        admin_id: uuid.UUID,
        data: ProviderApprovalRequest,
    ) -> Provider:
        provider = await self._get_pending_provider(provider_id)

        approved_provider = await self.repository.approve_provider(provider.id)
        if approved_provider is None:
            raise ProviderNotFoundError("Provider profile not found.")

        await self.record_verification_history(
            provider_id=approved_provider.id,
            admin_id=admin_id,
            action="approved",
            remarks=data.remarks,
        )
        await self.repository.commit()
        return approved_provider

    async def reject_provider(
        self,
        provider_id: uuid.UUID,
        admin_id: uuid.UUID,
        data: ProviderRejectionRequest,
    ) -> Provider:
        provider = await self._get_pending_provider(provider_id)

        rejected_provider = await self.repository.reject_provider(provider.id)
        if rejected_provider is None:
            raise ProviderNotFoundError("Provider profile not found.")

        await self.record_verification_history(
            provider_id=rejected_provider.id,
            admin_id=admin_id,
            action="rejected",
            remarks=data.remarks,
        )
        await self.repository.commit()
        return rejected_provider

    async def record_verification_history(
        self,
        *,
        provider_id: uuid.UUID,
        admin_id: uuid.UUID | None,
        action: str,
        remarks: str | None = None,
    ) -> VerificationHistory:
        return await self.repository.save_verification_history(
            provider_id=provider_id,
            admin_id=admin_id,
            action=action,
            remarks=remarks,
        )

    async def _get_pending_provider(self, provider_id: uuid.UUID) -> Provider:
        provider = await self.repository.get_provider_by_id(provider_id)
        if provider is None:
            raise ProviderNotFoundError("Provider profile not found.")

        if provider.verification_status != VerificationStatus.PENDING.value:
            raise ProviderNotPendingError("Only pending providers can be approved or rejected.")

        return provider
