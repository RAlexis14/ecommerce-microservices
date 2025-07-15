# 🛒 cart-service

This microservice handles the **shopping cart** functionality for the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Add products to a user's cart
- Retrieve all items in a user's cart
- Clear the cart after checkout or manually

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoints

| Method | Route                       | Description                   |
|--------|-----------------------------|-------------------------------|
| POST   | `/cart/add`                 | Add product to cart           |
| GET    | `/cart/get/<user_id>`       | Retrieve user's cart items    |
| DELETE | `/cart/clear/<user_id>`     | Clear user's cart             |

POST request body example:
```json
{
  "user_id": 1,
  "product_id": 3,
  "quantity": 2
}
```

---

## 🗃️ Database

Uses the `cart` table in the `orders` database:

```sql
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT
);
```

---

## 🐳 Docker Instructions

```bash
docker build -t rommela462/cart-service .
docker run -d -p 5010:5000 rommela462/cart-service
```

---

## 🧪 Testing

```bash
pytest
```

Tests include adding, retrieving, and clearing cart entries.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Prevents duplicate product entries
- All requests go through secured API Gateway

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
