from sqlalchemy.orm import Session

from models import User
from schemas import UserInfo


def get_user(database: Session, user_type: str, user_id: str):
    return database.query(User).filter(User.user_type == user_type, User.user_id == user_id).first()

def get_email(database: Session, email: str):
    return database.query(User).filter(User.email == email).first()

def get_all_user(database: Session, init: int = 0, user_num: int = 100):
    return database.query(User).offset(init).limit(user_num).all()


def create_user(database: Session, user: UserInfo):
    database_user = User(user_type=user.user_type,
                         user_id=user.user_id,
                         encrypted_password=user.encrypted_password,
                         nickname=user.nickname,
                         email=user.email,
                         user_status=user.user_status)
    database.add(database_user)
    database.commit()
    database.refresh(database_user)
    return database_user


def change_user_status(database: Session, user_type: str, user_id: str, status_info: int = 1):
    database.query(User).filter(User.user_type == user_type, User.user_id==user_id).update({"user_status": status_info})
    database.commit()
    return get_user(database, user_type, user_id)


def change_user_password(database: Session, user_type: str, user_id: str, new_hashed_password: str):
    database.query(User).filter(User.user_type == user_type, User.user_id==user_id).update({"hashed_password": new_hashed_password})
    database.commit()
    return get_user(database, user_type, user_id)


def delete_user(database: Session, user_type: str, user_id: str):
    database.query(User).filter(User.user_type == user_type, User.user_id==user_id).delete()
    database.commit()
    return get_user(database, user_type, user_id)
