from fastapi import APIRouter, Depends, Response, Request
from app.schemas.user import UserRegister, UserLogin
from app.services.user import UserService

router = APIRouter()


@router.post("/register")
def register_user(body: UserRegister, user_service: UserService = Depends()):
    user = user_service.register_user(body.username, body.email, body.password)
    return {"success": True, "user": user.to_json()}


@router.post("/login")
def login_user(
    body: UserLogin, response: Response, user_service: UserService = Depends()
):
    access_token = user_service.login_user(body.email, body.password)
    response.set_cookie(key="authorization", value=access_token, httponly=True)
    return {"success": True}


@router.get("/@me")
def get_current_user(request: Request, user_service: UserService = Depends()):
    user = user_service.check_auth(request)
    return user.to_json(email=True)
