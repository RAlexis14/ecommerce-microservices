# 🗑️ user-delete-service

This microservice handles the **deletion of users by ID** from the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Receive a user ID via request
- Delete the corresponding user record from the database
- Return success/failure response

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoint

| Method | Route                      | Description             |
|--------|----------------------------|-------------------------|
| DELETE | `/users/delete/<user_id>` | Delete user by ID       |

Example:
```
DELETE /users/delete/5
```

---

## 🗃️ Database

This service connects to the `users` database and deletes from:

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
docker build -t rommela462/user-delete-service .

# Run the container
docker run -d -p 5004:5000 rommela462/user-delete-service
```

---

## 🧪 Testing

To execute tests:

```bash
pytest
```

Ensure test users exist or mock the deletion logic.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Ensures user ID exists before deletion
- No soft-delete implemented (permanent deletion)
- JWT validation assumed at the API Gateway level

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
