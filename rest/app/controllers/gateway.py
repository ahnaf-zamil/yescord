from fastapi import APIRouter, Depends, Request
from app.services.user import UserService
from app.core.security import create_access_token
from app.core.config import settings
from app.eureka import eureka_client
from datetime import timedelta

router = APIRouter()


@router.post("/get")
def get_gateway_credentials(request: Request, user_service: UserService = Depends()):
    user = user_service.check_auth(request)
    gateway_token = create_access_token(
        str(user.id), timedelta(minutes=1), secret_key=settings.GATEWAY_SECRET_KEY
    )
    endpoint = eureka_client.do_service("GATEWAY", service="/url")
    # The access token will be used by the client to authenticate with gateway
    return {"token": gateway_token, "endpoint": endpoint}
