from fastapi import FastAPI
from routers import authentication, user_management

import models
from database import database_connection

models.Base.metadata.create_all(bind=database_connection.engine)

app = FastAPI()

app.include_router(authentication.router)
app.include_router(user_management.router)
