from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class AuthRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def find_by_email(self, email: str) -> User | None:
        normalized_email = email.strip().lower()
        result = await self.db.execute(
            select(User).where(
                User.email == normalized_email,
                User.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none()

    async def email_exists(self, email: str) -> bool:
        user = await self.find_by_email(email)
        return user is not None

    async def create_user(
        self,
        *,
        full_name: str,
        email: str,
        phone: str,
        password_hash: str,
        role: str = "customer",
        status: str = "active",
    ) -> User:
        user = User(
            full_name=full_name.strip(),
            email=email.strip().lower(),
            phone=phone.strip(),
            password_hash=password_hash,
            role=role,
            status=status,
        )
        self.db.add(user)
        await self.db.flush()
        await self.db.refresh(user)
        return user

    async def commit(self) -> None:
        await self.db.commit()
