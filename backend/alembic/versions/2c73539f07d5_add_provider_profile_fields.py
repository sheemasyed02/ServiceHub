"""add provider profile fields

Revision ID: 2c73539f07d5
Revises: c7ec361a6575
Create Date: 2026-08-04 13:11:36.592449

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '2c73539f07d5'
down_revision: Union[str, Sequence[str], None] = 'c7ec361a6575'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('providers', sa.Column('business_name', sa.String(length=255), nullable=True))
    op.add_column('providers', sa.Column('primary_service', sa.String(length=100), nullable=True))
    op.add_column('providers', sa.Column('secondary_services', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.add_column('providers', sa.Column('profile_photo_url', sa.String(length=512), nullable=True))
    op.add_column('providers', sa.Column('address_line1', sa.String(length=255), nullable=True))
    op.add_column('providers', sa.Column('address_line2', sa.String(length=255), nullable=True))
    op.add_column('providers', sa.Column('city', sa.String(length=100), nullable=True))
    op.add_column('providers', sa.Column('state', sa.String(length=100), nullable=True))
    op.add_column('providers', sa.Column('pincode', sa.String(length=20), nullable=True))
    op.add_column('providers', sa.Column('country', sa.String(length=100), nullable=True))
    op.add_column('providers', sa.Column('gender', sa.String(length=50), nullable=True))
    op.add_column('providers', sa.Column('date_of_birth', sa.Date(), nullable=True))

    op.execute(
        """
        UPDATE providers
        SET business_name = COALESCE(business_name, 'Unnamed Business'),
            primary_service = COALESCE(primary_service, 'General Services')
        WHERE business_name IS NULL OR primary_service IS NULL
        """
    )

    op.alter_column('providers', 'business_name', nullable=False)
    op.alter_column('providers', 'primary_service', nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('providers', 'date_of_birth')
    op.drop_column('providers', 'gender')
    op.drop_column('providers', 'country')
    op.drop_column('providers', 'pincode')
    op.drop_column('providers', 'state')
    op.drop_column('providers', 'city')
    op.drop_column('providers', 'address_line2')
    op.drop_column('providers', 'address_line1')
    op.drop_column('providers', 'profile_photo_url')
    op.drop_column('providers', 'secondary_services')
    op.drop_column('providers', 'primary_service')
    op.drop_column('providers', 'business_name')
