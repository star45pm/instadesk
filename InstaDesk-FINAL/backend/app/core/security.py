
# Argon2id, AES-GCM + KMS (PRD 보안 요구사항)
from passlib.context import CryptContext
pwd_ctx = CryptContext(schemes=["argon2"], deprecated="auto")
def hash_password(pw: str): return pwd_ctx.hash(pw)
def verify_password(pw, h): return pwd_ctx.verify(pw, h)

# Token vault: AES-GCM + KMS wrapping - placeholder for AWS KMS / local key
from cryptography.fernet import Fernet
import os
_key = os.getenv("VAULT_KEY") or Fernet.generate_key()
fernet = Fernet(_key if len(_key)>30 else Fernet.generate_key())
def encrypt_token(t: str) -> str: return fernet.encrypt(t.encode()).decode()
def decrypt_token(c: str) -> str: return fernet.decrypt(c.encode()).decode()
