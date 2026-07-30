from app.core.security import hash_password, verify_password

password = "Sheema123"
hashed = hash_password(password)
verified = verify_password(password, hashed)

print("Original Password:", password)
print("Hashed Password:", hashed)
print("Password Verification Result:", verified)