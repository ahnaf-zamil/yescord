from pydantic import BaseModel, EmailStr, constr


# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class UserRegister(UserBase):
    username: constr(min_length=3, max_length=32)


class UserLogin(UserBase):
    pass
