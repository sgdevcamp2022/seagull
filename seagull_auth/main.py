from fastapi import FastAPI
from seagull_auth.routers import authentication, user_management

import models
from seagull_auth.database.database_connection import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(authentication.router)
app.include_router(user_management.router)
