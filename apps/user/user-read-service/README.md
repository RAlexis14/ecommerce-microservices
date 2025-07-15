# 👤 user-read-service

This microservice handles the **retrieval of user information by ID** in the Fútbol Total RM – Quito Edition system.

---

## 🚀 Main Responsibilities

- Fetch user details from the `users` database
- Return user information by `user_id`
- Validate if user exists

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoint

| Method | Route                    | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/users/read/<user_id>` | Get user info by ID          |

Example:
```
GET /users/read/5
```

---

## 🗃️ Database

This service uses the `users` database with the `users` table.

**Expected schema**:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
```

---

## 🐳 Docker Instructions

```bash
# Build the Docker image
docker build -t rommela462/user-read-service .

# Run the container
docker run -d -p 5002:5000 rommela462/user-read-service
```

---

## 🧪 Testing

To run tests:

```bash
pytest
```

Ensure test data is available or mock the database connection.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Does not expose password field in the response
- Works behind the API Gateway (JWT validation assumed upstream)

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
