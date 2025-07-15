# 👤 user-create-service

This microservice handles the **creation of new users** in the Fútbol Total RM – Quito Edition system.

---

## 🚀 Main Responsibilities

- Register new users into the `users` database
- Validate incoming data (name, email, password)
- Return success/failure response
- Generate default role (optional, if integrated)

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoint

| Method | Route            | Description            |
|--------|------------------|------------------------|
| POST   | `/users/create`  | Create a new user      |

Request body example:
```json
{
  "name": "Rommel",
  "email": "rommel@example.com",
  "password": "securepassword123"
}
```

---

## 🗃️ Database

This service uses the `users` database with the `users` table.

**Schema example**:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
```

---

## 🐳 Docker Instructions

```bash
# Build the Docker image
docker build -t rommela462/user-create-service .

# Run the container
docker run -d -p 5001:5000 rommela462/user-create-service
```

---

## 🧪 Testing

Unit tests can be run with:

```bash
pytest
```

Ensure you have a `.env` or test database ready.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs` *(if Swagger is integrated)*

---

## 🔐 Security

- Validates required fields (basic)
- JWT integration is handled by the API Gateway or upstream service

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
