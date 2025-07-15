# 📑 order-placement-service

This microservice manages **order placement** for the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Create new orders from the shopping cart
- Save order data including user, product, and quantity
- Retrieve list of orders by user ID

---

## ⚙️ Tech Stack

- 🟩 Node.js
- ⚙️ Express.js
- 🐬 MySQL
- 🐳 Docker
- 🧪 Jest

---

## 📦 API Endpoints

| Method | Route            | Description              |
|--------|------------------|--------------------------|
| POST   | `/create`        | Place a new order        |
| GET    | `/list/:user_id` | List orders by user ID   |

POST request body example:
```json
{
  "user_id": 1,
  "product_id": 2,
  "quantity": 3
}
```

---

## 🗃️ Database

Uses the `orders` database and the `orders` table:

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT
);
```

---

## 🐳 Docker Instructions

```bash
docker build -t rommela462/order-placement-service .
docker run -d -p 5009:3000 rommela462/order-placement-service
```

---

## 🧪 Testing

```bash
npm run test
```

Tests are written using Jest.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:3000/docs`

---

## 🔐 Security

- Validates required fields
- Assumes authentication is managed at API Gateway level

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
