from fastapi import APIRouter, Depends, HTTPException, status

from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, ExpiredSignatureError, jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from sqlalchemy.orm import Session
from schemas import UserInfo, LoginUserInfo, RegisterUserInfo, EmailSendingInfo
from seagull_auth.database.database_connection import get_database, Redis
from seagull_auth.database.database_process import create_user, get_user, get_email

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

import string
import random
import requests

from dotenv import load_dotenv
import os


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

load_dotenv()

argon2_hash = PasswordHasher()

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 20160

KAKAO_CLIENT_ID = os.environ.get("KAKAO_CLIENT_ID")
KAKAO_CLIENT_SECRET = os.environ.get("KAKAO_CLIENT_SECRET")
KAKAO_REDIRECT_URI = os.environ.get("KAKAO_REDIRET_URI")

conf = ConnectionConfig(
    MAIL_USERNAME = os.environ.get("EMAIL_USERNAME"),
    MAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD"),
    MAIL_FROM = os.environ.get("EMAIL_USERNAME"),
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="AuthSenter",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)


def create_jwt_token(payload_data: dict, expires_delta: Optional[timedelta] = None):
    token_body_data = payload_data.copy()
    if expires_delta:
        expire_time = datetime.utcnow() + expires_delta
    else:
        expire_time = datetime.utcnow() + timedelta(minutes=15)
    token_body_data.update({"exp": expire_time})
    encoded_jwt = jwt.encode(token_body_data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register")
async def register(inputted_user_info: RegisterUserInfo, database: Session = Depends(get_database)):
    auth_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="User ID is already exist",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if get_user(database, "normal", inputted_user_info.user_id):
        raise auth_exception
    if get_email(database, inputted_user_info.email):
        auth_exception.detail = "email is already exist"
        raise auth_exception
    if inputted_user_info.password != inputted_user_info.password_check:
        auth_exception.detail = "password rechecking is failed"
        return auth_exception
    new_user = {
        "user_type": "normal",
        "user_id": inputted_user_info.user_id,
        "encrypted_password": argon2_hash.hash(inputted_user_info.password),
        "nickname": inputted_user_info.nickname,
        "email": inputted_user_info.email,
    }
    create_user(database, UserInfo(**new_user))
    return {"detail": "User successfully created"}


@router.get("/id_duplicate_check")
async def id_duplicate_check(user_type: str, user_id: str, database: Session = Depends(get_database)):
    if get_user(database, user_type, user_id) != None:
        return {"duplicate": True, "detail": "user is already exist"}
    else:
        return {"duplicate": False, "detail": "this id is useable"}


@router.get("/login/normal")
async def login(inputted_user_info: LoginUserInfo = Depends(), database: Session = Depends(get_database)):
    user_info_in_db = get_user(database, "normal", inputted_user_info.user_id)
    auth_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect id or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not user_info_in_db:
        raise auth_exception
    try:
        argon2_hash.verify(user_info_in_db.encrypted_password, inputted_user_info.password)

        access_token = create_jwt_token(
            payload_data={
                "token_type": "access_token",
                "user_type": "normal",
                "user_id": user_info_in_db.user_id
            },
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        refresh_token = create_jwt_token(
            payload_data={
                "token_type": "refresh_token",
                "user_type": "normal",
                "user_id": user_info_in_db.user_id
            },
            expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
        )
    except VerifyMismatchError:
        raise auth_exception
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "Bearer"}


@router.get("/login/kakao")
async def kakao_login(auth_code :str, database: Session = Depends(get_database)):
    kakao_auth = "https://kauth.kakao.com/oauth/authorize?client_id=" + KAKAO_CLIENT_ID\
                 + "&redirect_uri=" + KAKAO_REDIRECT_URI + \
                 "&response_type=code"
    requests.get(kakao_auth)

    data = {
        'grant_type': 'authorization_code',
        'client_id': KAKAO_CLIENT_ID,
        'redirect_uri': KAKAO_REDIRECT_URI,
        'code': auth_code,
        'client_secret': KAKAO_CLIENT_SECRET,
    }

    try:
        response = requests.post('https://kauth.kakao.com/oauth/token', data=data)
        kakao_access_token = response.json()["access_token"]

        headers = {
            'Authorization': 'Bearer ' + kakao_access_token,
        }

        response = requests.get('https://kapi.kakao.com/v2/user/me', headers=headers)
    except:
        auth_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Response time is over",
            headers={"WWW-Authenticate": "Bearer"},
        )
        raise auth_exception

    user_info = response.json()
    user_id = str(user_info["id"])
    if get_user(database, "kakao", user_id) == None:
        user_nickname = user_info["kakao_account"]["profile"]["nickname"]
        user_email = None
        try:
            user_email = user_info["kakao_account"]["email"]
        except:
            user_email = None
        new_kakao_user = {
            "user_type": "kakao",
            "user_id": user_id,
            "encrypted_password": None,
            "nickname": user_nickname,
            "email": user_email,
        }
        create_user(database, UserInfo(**new_kakao_user))

    access_token = create_jwt_token(
        payload_data={
            "token_type": "access_token",
            "user_type": "kakao",
            "user_id": user_id
        },
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    refresh_token = create_jwt_token(
        payload_data={
            "token_type": "refresh_token",
            "user_type": "kakao",
            "user_id": user_id
        },
        expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    )

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "Bearer"}


@router.get("/verify_access_token")
async def verify_token(access_token: str, database: Session = Depends(get_database)):
    jwt_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token is Invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
        token_user_type = token_payload.get("user_type")
        token_user_id = token_payload.get("user_id")
        saved_user_info = get_user(database, token_user_type, token_user_id)
        token_type = token_payload.get("token_type")
        if token_user_id == None or saved_user_info == None or token_type != "access_token":
            raise jwt_exception
    except ExpiredSignatureError:
        jwt_exception.detail = "Token lifetime is expired"
        raise jwt_exception
    except JWTError:
        raise jwt_exception
    return {"detail": "Token validation successfully completed", "user": saved_user_info}


@router.get("/reissue_access_token")
async def reissue_access_token(refresh_token: str, database: Session = Depends(get_database)):
    jwt_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token is Invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
        token_user_type = token_payload.get("user_type")
        token_user_id = token_payload.get("user_id")
        saved_user_info = get_user(database, token_user_type, token_user_id)
        token_type = token_payload.get("token_type")
        if token_user_id == None or saved_user_info == None or token_type != "refresh_token":
            raise jwt_exception
    except ExpiredSignatureError:
        jwt_exception.detail = "Token lifetime is expired"
        raise jwt_exception
    except JWTError:
        raise jwt_exception

    access_token = create_jwt_token(
        payload_data={
            "sub": "access_token",
            "aud": token_user_id
        },
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"detail": "access token is reissued", "access_token": access_token}


@router.post("/email_auth/sending_email")
async def sending_email(email: EmailSendingInfo):
    length_of_string = 5
    auth_code = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(length_of_string))
    html = """<p>Hi, auth code is : """ + auth_code + """</p>"""
    Redis.setex(email.dict().get("email"), 300, auth_code)

    message = MessageSchema(
        subject="seagull auth code",
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}


@router.post("/email_auth/verify_email_code/{verify_code}")
async def verify_email_code(email: EmailSendingInfo, verify_code: str):
    email_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="verify code is already expired or invaild",
        headers={"WWW-Authenticate": "Bearer"},
    )
    saved_verify_code = Redis.get(email.dict().get("email")[0])
    if saved_verify_code == None:
        raise email_exception
    if saved_verify_code.decode('ascii') != verify_code:
        email_exception.detail = "verify code is worng"
        raise email_exception
    return {"message": "email verification is complite"}