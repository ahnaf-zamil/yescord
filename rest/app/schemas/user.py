from pydantic import BaseModel, EmailStr, constr


# Shared properties
class UserBase(BaseModel):
    username: constr(min_length=3, max_length=32)
    email: EmailStr


class UserRegister(UserBase):
    password: constr(min_length=8)
