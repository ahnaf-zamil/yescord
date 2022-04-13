from fastapi import APIRouter, Depends
from app.schemas import UserRegister
from app.services.user import UserService

router = APIRouter()


@router.post("/register")
def register_user(body: UserRegister, user_service: UserService = Depends()):
    user = user_service.register_user(body.username, body.email, body.password)
    return {"success": True, "user": user.to_json()}
