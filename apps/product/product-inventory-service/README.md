# 📦 inventory-service

This microservice manages the **inventory control** of products for the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Add and update product stock
- Retrieve inventory information by product ID
- Synchronize with product catalog service (if required)

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoints

| Method | Route                        | Description                       |
|--------|------------------------------|-----------------------------------|
| POST   | `/inventory/add`             | Add or update product stock       |
| GET    | `/inventory/list/<product_id>` | Get inventory for a product     |

POST request body example:
```json
{
  "product_id": 1,
  "quantity": 15
}
```

---

## 🗃️ Database

Uses the `products` database and the `inventory` table:

```sql
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT
);
```

---

## 🐳 Docker Instructions

```bash
docker build -t rommela462/inventory-service .
docker run -d -p 5008:5000 rommela462/inventory-service
```

---

## 🧪 Testing

```bash
pytest
```

Mock inventory entries can be used for unit tests.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Product stock management should be limited to authorized roles
- API Gateway enforces authentication

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
