import uuid
from datetime import date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.provider import Provider
from app.models.user import User
from app.models.verification_history import VerificationHistory
from app.schemas.provider import VerificationStatus


class ProviderRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    def _provider_query(self):
        return select(Provider).options(selectinload(Provider.user))

    async def create_provider(
        self,
        *,
        user_id: uuid.UUID,
        business_name: str,
        primary_service: str,
        secondary_services: list[str] | None,
        profile_photo_url: str | None,
        bio: str | None,
        experience_years: int,
        working_radius: float,
        latitude: float,
        longitude: float,
        address_line1: str | None,
        address_line2: str | None,
        city: str | None,
        state: str | None,
        pincode: str | None,
        country: str | None,
        gender: str | None,
        date_of_birth: date | None,
    ) -> Provider:
        provider = Provider(
            user_id=user_id,
            business_name=business_name,
            primary_service=primary_service,
            secondary_services=secondary_services,
            profile_photo_url=profile_photo_url,
            bio=bio,
            experience_years=experience_years,
            working_radius=working_radius,
            latitude=latitude,
            longitude=longitude,
            address_line1=address_line1,
            address_line2=address_line2,
            city=city,
            state=state,
            pincode=pincode,
            country=country,
            gender=gender,
            date_of_birth=date_of_birth,
            verification_status=VerificationStatus.PENDING.value,
        )
        self.db.add(provider)
        await self.db.flush()
        return await self.get_provider_by_id(provider.id)

    async def get_provider_by_user_id(self, user_id: uuid.UUID) -> Provider | None:
        result = await self.db.execute(
            self._provider_query().where(
                Provider.user_id == user_id,
                Provider.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none()

    async def get_provider_by_id(self, provider_id: uuid.UUID) -> Provider | None:
        result = await self.db.execute(
            self._provider_query().where(
                Provider.id == provider_id,
                Provider.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none()

    async def list_pending_providers(self) -> list[Provider]:
        result = await self.db.execute(
            self._provider_query()
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
        return await self.get_provider_by_id(provider.id)

    async def reject_provider(self, provider_id: uuid.UUID) -> Provider | None:
        provider = await self.get_provider_by_id(provider_id)
        if provider is None:
            return None

        provider.verification_status = VerificationStatus.REJECTED.value
        await self.db.flush()
        return await self.get_provider_by_id(provider.id)

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

    async def update_user_role(self, user_id: uuid.UUID, role: str) -> None:
        result = await self.db.execute(
            select(User).where(
                User.id == user_id,
                User.deleted_at.is_(None),
            )
        )
        user = result.scalar_one_or_none()
        if user is None:
            return

        user.role = role
        await self.db.flush()
