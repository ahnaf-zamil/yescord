"""Added guild invite model

Revision ID: 345c70c3a7b1
Revises: 
Create Date: 2022-04-13 15:49:44.753028

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "345c70c3a7b1"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "invites",
        sa.Column("id", sa.BigInteger(), nullable=False),
        sa.Column("code", sa.String(length=10), nullable=True),
        sa.Column("expires_at", sa.BigInteger(), nullable=True),
        sa.Column("guild_id", sa.BigInteger(), nullable=True),
        sa.ForeignKeyConstraint(
            ["guild_id"],
            ["guild.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("invites")
    # ### end Alembic commands ###
