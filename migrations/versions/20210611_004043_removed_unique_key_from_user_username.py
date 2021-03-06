"""removed unique key from user username

Revision ID: d89e6f02d161
Revises: ecb8901bb43c
Create Date: 2021-06-11 00:40:43.591090

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd89e6f02d161'
down_revision = 'ecb8901bb43c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('users_username_key', 'users', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('users_username_key', 'users', ['username'])
    # ### end Alembic commands ###
