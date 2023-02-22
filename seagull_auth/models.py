from sqlalchemy import Column, Integer, String, PrimaryKeyConstraint
from database.database_connection import Base


class User(Base):
    __tablename__ = "UserInfo"

    user_type = Column(String(20))
    user_id = Column(String(40))
    encrypted_password = Column(String(100))
    nickname = Column(String(100))
    email = Column(String(40))
    user_status = Column(Integer)

    PrimaryKeyConstraint(user_type, user_id, name="primary_user")



