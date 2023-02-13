from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from seagull_auth.database.database_connection import get_database
from seagull_auth.database.database_process import get_user, get_all_user, change_user_status, change_user_password, delete_user


router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.get("/get_all")
async def get_all(init: int, user_num: int, database: Session = Depends(get_database)):
    return get_all_user(database, init, user_num)


@router.put("/change/status")
async def change_status(user_type: str, user_id: str, user_status: int, database: Session = Depends(get_database)):
    return change_user_status(database, user_type, user_id, user_status)


@router.put("/change/password")
async def change_password(user_type: str, user_id: str, new_password: str, database: Session = Depends(get_database)):
    return change_user_password(database, user_type, user_id, argon2_hash.hash(new_password))


@router.delete("/delete")
async def delete(user_type: str, user_id: str, user_password: str, database: Session = Depends(get_database)):
    auth_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_info = get_user(database, user_type, user_id)
    if argon2_hash.verify(user_info["encrypted_password"],user_password):
        raise auth_exception
    delete_user(database, user_type, user_id)
    return {"detail": "delete is complete"}
