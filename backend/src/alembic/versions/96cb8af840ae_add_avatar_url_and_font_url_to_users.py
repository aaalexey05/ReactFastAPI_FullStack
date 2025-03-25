"""Add avatar_url and font_url to users

Revision ID: 96cb8af840ae
Revises: 
Create Date: 2025-03-19 14:50:50.778497

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '96cb8af840ae'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# Описание изменений для миграции
def upgrade():
    # Добавляем колонки avatar_url и font_url в таблицу users
    op.add_column('users', sa.Column('avatar_url', sa.String(), nullable=True))
    op.add_column('users', sa.Column('font_url', sa.String(), nullable=True))


def downgrade():
    # Удаляем колонки avatar_url и font_url в случае отката миграции
    op.drop_column('users', 'avatar_url')
    op.drop_column('users', 'font_url')