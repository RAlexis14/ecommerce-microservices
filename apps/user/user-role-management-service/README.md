# 🛡️ user-role-service

This microservice handles the **assignment and management of user roles** in the Fútbol Total RM – Quito Edition system.

---

## 🚀 Main Responsibilities

- Assign roles to users (e.g., admin, client)
- Store role associations in the database
- Support role creation or fixed role types

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoint

| Method | Route            | Description                  |
|--------|------------------|------------------------------|
| POST   | `/users/roles`   | Assign role to a user        |

Request body example:
```json
{
  "user_id": 1,
  "role": "admin"
}
```

---

## 🗃️ Database

Uses the `users` database and interacts with:

```sql
CREATE TABLE user_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  role VARCHAR(100)
);
```

---

## 🐳 Docker Instructions

```bash
# Build the Docker image
docker build -t rommela462/user-role-service .

# Run the container
docker run -d -p 5006:5000 rommela462/user-role-service
```

---

## 🧪 Testing

```bash
pytest
```

Mock data or isolated DB recommended for test cases.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Role assignment typically requires admin privileges (handled by gateway)
- Input validation for accepted role names

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
