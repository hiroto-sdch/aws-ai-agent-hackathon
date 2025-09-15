from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from app.core.database import Base

class MessageType(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"

class Conversation(Base):
    __tablename__ = "conversations"

    conversation_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    message_type = Column(Enum(MessageType), nullable=False)
    content = Column(Text, nullable=False)
    message_metadata = Column(JSONB)  # Store additional context, tokens used, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="conversations")

    def __repr__(self):
        return f"<Conversation(type={self.message_type}, content={self.content[:50]}...)>"

# Add relationship to User model
from app.models.user import User
User.conversations = relationship("Conversation", back_populates="user")