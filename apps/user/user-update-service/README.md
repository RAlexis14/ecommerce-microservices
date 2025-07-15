# 👤 user-update-service

This microservice handles the **updating of user information** in the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Receive user ID and updated data
- Modify existing user record in the database
- Validate input data and user existence

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoint

| Method | Route                      | Description              |
|--------|----------------------------|--------------------------|
| PUT    | `/users/update/<user_id>` | Update user info by ID   |

Request body example:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword123"
}
```

---

## 🗃️ Database

Uses the `users` database with the following table:

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
docker build -t rommela462/user-update-service .

# Run the container
docker run -d -p 5003:5000 rommela462/user-update-service
```

---

## 🧪 Testing

Run the unit tests with:

```bash
pytest
```

Make sure test users exist or mock the update logic.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Accepts updates only with valid input
- Password update allowed (re-hashing assumed)
- JWT and authentication handled at gateway level

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
