# 🔐 user-password-recovery-service

This microservice handles the **password recovery process** for users in the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Accept a password recovery request (email input)
- Simulate sending of a password reset token or instructions
- (Optionally) Update password in database (if full recovery flow is implemented)

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoint

| Method | Route                        | Description                    |
|--------|------------------------------|--------------------------------|
| POST   | `/users/password-recovery`  | Start password recovery process |

Request body example:
```json
{
  "email": "rommel@example.com"
}
```

---

## 🗃️ Database

Uses the `users` database and reads from:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
```

No actual password change occurs unless implemented via token verification.

---

## 🐳 Docker Instructions

```bash
# Build the Docker image
docker build -t rommela462/user-password-recovery-service .

# Run the container
docker run -d -p 5005:5000 rommela462/user-password-recovery-service
```

---

## 🧪 Testing

```bash
pytest
```

Tests should mock the email/token system or use dummy outputs.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Avoids leaking whether an email exists
- Gateway handles authentication and rate-limiting

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
