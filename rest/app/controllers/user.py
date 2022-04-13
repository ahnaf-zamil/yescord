from datetime import timedelta
from fastapi import APIRouter, Depends, Response, Request
from app.schemas.user import UserRegister, UserLogin
from app.services.user import UserService
from app.core.security import create_access_token

router = APIRouter()


@router.post("/register", status_code=201)
def register_user(
    body: UserRegister, response: Response, user_service: UserService = Depends()
):
    user = user_service.register_user(body.username, body.email, body.password)
    access_token = create_access_token(str(user.id), timedelta(days=7))
    response.set_cookie(key="authorization", value=access_token, httponly=True)
    return {"success": True, "user": user.to_json()}


@router.post("/login")
def login_user(
    body: UserLogin, response: Response, user_service: UserService = Depends()
):
    user = user_service.login_user(body.email, body.password)
    access_token = create_access_token(str(user.id), timedelta(days=7))
    response.set_cookie(key="authorization", value=access_token, httponly=True)
    return {"success": True, "user": user.to_json()}


@router.get("/@me")
def get_current_user(request: Request, user_service: UserService = Depends()):
    user = user_service.check_auth(request)
    return user.to_json(email=True)
