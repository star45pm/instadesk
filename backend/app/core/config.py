
from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://instadesk:change_me@db:5432/instadesk"
    JWT_SECRET: str = "change_me"
    IG_APP_ID: str = ""
    IG_APP_SECRET: str = ""
    REDIRECT_URI: str = "https://instar.xrocket.kr/api/ig/callback"
    PROXY_GATEWAY_URL: str = ""
    S3_BUCKET: str = "instadesk-assets"
    class Config:
        env_file = ".env"
settings = Settings()
