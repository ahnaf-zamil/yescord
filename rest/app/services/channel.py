from typing import Optional
from .base import DatabaseAware
from app.models import Channel


class ChannelService(DatabaseAware):
    def get(self, channel_id: int) -> Optional[Channel]:
        return self.db.query(Channel).filter_by(id=channel_id).first()
