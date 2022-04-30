from fastapi import APIRouter, Depends, Request

from app.services.user import UserService
from app.services.message import MessageService
from app.schemas.channel import SendMessage
from app.services.channel import ChannelService

router = APIRouter()


@router.post("/{channel_id}")
def send_message(
    channel_id: int,
    body: SendMessage,
    request: Request,
    user_service: UserService = Depends(),
    message_service: MessageService = Depends(),
    channel_service: ChannelService = Depends(),
):
    user = user_service.check_auth(request)
    channel = channel_service.get(channel_id)
    message = message_service.send_message(user.id, channel, body.content)

    return message.to_json()
