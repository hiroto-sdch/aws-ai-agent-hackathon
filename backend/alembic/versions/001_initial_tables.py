"""Initial tables

Revision ID: 001
Revises:
Create Date: 2024-01-15 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Create users table
    op.create_table('users',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('risk_tolerance', sa.Enum('LOW', 'MEDIUM', 'HIGH', name='risktolerance'), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('user_id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)

    # Create portfolios table
    op.create_table('portfolios',
        sa.Column('portfolio_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('symbol', sa.String(length=20), nullable=False),
        sa.Column('quantity', sa.Numeric(precision=15, scale=4), nullable=False),
        sa.Column('average_price', sa.Numeric(precision=15, scale=4), nullable=False),
        sa.Column('purchase_date', sa.Date(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
        sa.PrimaryKeyConstraint('portfolio_id')
    )
    op.create_index(op.f('ix_portfolios_symbol'), 'portfolios', ['symbol'], unique=False)

    # Create investment_history table
    op.create_table('investment_history',
        sa.Column('transaction_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('symbol', sa.String(length=20), nullable=False),
        sa.Column('transaction_type', sa.Enum('BUY', 'SELL', name='transactiontype'), nullable=False),
        sa.Column('quantity', sa.Numeric(precision=15, scale=4), nullable=False),
        sa.Column('price', sa.Numeric(precision=15, scale=4), nullable=False),
        sa.Column('transaction_date', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
        sa.PrimaryKeyConstraint('transaction_id')
    )
    op.create_index(op.f('ix_investment_history_symbol'), 'investment_history', ['symbol'], unique=False)

    # Create conversations table
    op.create_table('conversations',
        sa.Column('conversation_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('message_type', sa.Enum('USER', 'ASSISTANT', name='messagetype'), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('message_metadata', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
        sa.PrimaryKeyConstraint('conversation_id')
    )

    # Create market_data table
    op.create_table('market_data',
        sa.Column('symbol', sa.String(length=20), nullable=False),
        sa.Column('price', sa.Numeric(precision=15, scale=4), nullable=False),
        sa.Column('volume', sa.BigInteger(), nullable=True),
        sa.Column('change_percent', sa.Numeric(precision=5, scale=2), nullable=True),
        sa.Column('last_updated', sa.DateTime(timezone=True), nullable=False),
        sa.Column('data_source', sa.String(length=50), nullable=True),
        sa.PrimaryKeyConstraint('symbol')
    )
    op.create_index(op.f('ix_market_data_symbol'), 'market_data', ['symbol'], unique=False)

def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_index(op.f('ix_market_data_symbol'), table_name='market_data')
    op.drop_table('market_data')

    op.drop_table('conversations')

    op.drop_index(op.f('ix_investment_history_symbol'), table_name='investment_history')
    op.drop_table('investment_history')

    op.drop_index(op.f('ix_portfolios_symbol'), table_name='portfolios')
    op.drop_table('portfolios')

    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')

    # Drop enums
    op.execute('DROP TYPE IF EXISTS risktolerance')
    op.execute('DROP TYPE IF EXISTS transactiontype')
    op.execute('DROP TYPE IF EXISTS messagetype')