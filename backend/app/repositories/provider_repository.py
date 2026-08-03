import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.provider import Provider
from app.models.verification_history import VerificationHistory
from app.schemas.provider import VerificationStatus


class ProviderRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create_provider(
        self,
        *,
        user_id: uuid.UUID,
        bio: str | None,
        experience_years: int,
        working_radius: float,
        latitude: float,
        longitude: float,
    ) -> Provider:
        provider = Provider(
            user_id=user_id,
            bio=bio,
            experience_years=experience_years,
            working_radius=working_radius,
            latitude=latitude,
            longitude=longitude,
            verification_status=VerificationStatus.PENDING.value,
        )
        self.db.add(provider)
        await self.db.flush()
        await self.db.refresh(provider)
        return provider

    async def get_provider_by_user_id(self, user_id: uuid.UUID) -> Provider | None:
        result = await self.db.execute(
            select(Provider).where(
                Provider.user_id == user_id,
                Provider.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none()

    async def get_provider_by_id(self, provider_id: uuid.UUID) -> Provider | None:
        result = await self.db.execute(
            select(Provider).where(
                Provider.id == provider_id,
                Provider.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none()

    async def list_pending_providers(self) -> list[Provider]:
        result = await self.db.execute(
            select(Provider)
            .where(
                Provider.verification_status == VerificationStatus.PENDING.value,
                Provider.deleted_at.is_(None),
            )
            .order_by(Provider.created_at.asc())
        )
        return list(result.scalars().all())

    async def approve_provider(self, provider_id: uuid.UUID) -> Provider | None:
        provider = await self.get_provider_by_id(provider_id)
        if provider is None:
            return None

        provider.verification_status = VerificationStatus.APPROVED.value
        await self.db.flush()
        await self.db.refresh(provider)
        return provider

    async def reject_provider(self, provider_id: uuid.UUID) -> Provider | None:
        provider = await self.get_provider_by_id(provider_id)
        if provider is None:
            return None

        provider.verification_status = VerificationStatus.REJECTED.value
        await self.db.flush()
        await self.db.refresh(provider)
        return provider

    async def save_verification_history(
        self,
        *,
        provider_id: uuid.UUID,
        admin_id: uuid.UUID | None,
        action: str,
        remarks: str | None = None,
    ) -> VerificationHistory:
        history = VerificationHistory(
            provider_id=provider_id,
            admin_id=admin_id,
            action=action,
            remarks=remarks,
        )
        self.db.add(history)
        await self.db.flush()
        await self.db.refresh(history)
        return history

    async def commit(self) -> None:
        await self.db.commit()
