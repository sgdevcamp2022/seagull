from typing import Optional

from pydantic import EmailStr, BaseModel


class UserInfo(BaseModel):
    user_type: str
    user_id: str
    encrypted_password: str
    nickname: str
    email: EmailStr = None
    user_status: int = 1

    class Config:
        orm_mode = True


class LoginUserInfo(BaseModel):
    user_id: str
    password: str


class RegisterUserInfo(BaseModel):
    user_id: str
    password: str
    password_check: str
    nickname: str
    email: EmailStr = None


class EmailSendingInfo(BaseModel):
    email: EmailStr