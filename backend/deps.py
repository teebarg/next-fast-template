from typing import Annotated, Any, Generator

import firebase_admin
import pyrebase
import requests
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth, credentials, storage
from sqlmodel import Session

import crud
import schemas
from core.config import settings
from core.logging import logger
from db.engine import engine
from models.user import User

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login/access-token")


def get_db() -> Generator:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_auth() -> Generator:
    try:
        if not firebase_admin._apps:  # Check if the app is not already initialized
            cred = credentials.Certificate(settings.FIREBASE_CRED)
            firebase_admin.initialize_app(
                cred, {"storageBucket": settings.STORAGE_BUCKET}
            )
        firebase = pyrebase.initialize_app(settings.FIREBASE_CONFIG)

        # Get a reference to the auth service
        yield firebase.auth()
    except Exception as e:
        logger.error(f"An error occurred while trying to initialize auth. Error: {e}")
        raise HTTPException(
            status_code=(
                int(e.status_code)
                if hasattr(e, "status_code")
                else status.HTTP_500_INTERNAL_SERVER_ERROR
            ),
            detail=(
                e.detail
                if hasattr(e, "detail")
                else f"An error occurred while trying to initialize auth, {e}"
            ),
        ) from e
    finally:
        logger.error("auth closed")


def get_storage() -> Generator:
    try:
        if not firebase_admin._apps:  # Check if the app is not already initialized
            cred = credentials.Certificate(settings.FIREBASE_CRED)
            firebase_admin.initialize_app(
                cred, {"storageBucket": settings.STORAGE_BUCKET}
            )

        # Get a reference to the bucket
        yield storage.bucket()
    except Exception as e:
        logger.error(f"storage init error, {e}")
    finally:
        logger.debug("storage closed")


def get_current_user(
    db: SessionDep, token: TokenDep, auth2: Any = Depends(get_auth)
) -> User:
    try:
        if token is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token cannot be none",
            )

        data = auth.verify_id_token(token)
        if "email" in data:
            if user := crud.get_user_by_email(db=db, email=data["email"]):
                return user
        elif user := crud.user.get(db=db, id=data["uid"]):
            return user

        else:
            raise HTTPException(status_code=404, detail="User not found")
    except requests.exceptions.HTTPError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        ) from None
    except Exception as e:
        logger.error(f"Get current user error, ${e}")
        if "Token expired" in str(e):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token expired",
            ) from None
        if "Wrong number of segments in token" in str(e):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Provide a valid token",
            ) from None
        if "Could not verify token signature." in str(e):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not verify token signature.",
            ) from None
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"An error occurred while trying to validate credentials, {e}",
        ) from None


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    if not current_user:
        raise HTTPException(status_code=401, detail="Unauthenticated user")
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


CurrentUser = Annotated[User, Depends(get_current_active_user)]


def get_current_active_superuser(
    current_user: schemas.User = Depends(get_current_user),
) -> schemas.User:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user
