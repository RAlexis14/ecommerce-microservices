# 🛍️ product-catalog-service

This microservice handles the **product catalog** for the Fútbol Total RM – Quito Edition platform.

---

## 🚀 Main Responsibilities

- Store and retrieve product data
- Allow product creation and listing
- Serve detailed product information

---

## ⚙️ Tech Stack

- 🐍 Python 3.10
- 🔧 Flask
- 🐬 MySQL
- 🐳 Docker
- 🧪 Pytest

---

## 📦 API Endpoints

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/products/create`       | Add a new product        |
| GET    | `/products/list/<id>`    | Get product details      |

POST request body example:
```json
{
  "name": "Football Shoes",
  "description": "High quality cleats",
  "price": 49.99
}
```

---

## 🗃️ Database

Uses the `products` database and the following table:

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2)
);
```

---

## 🐳 Docker Instructions

```bash
docker build -t rommela462/product-catalog-service .
docker run -d -p 5007:5000 rommela462/product-catalog-service
```

---

## 🧪 Testing

```bash
pytest
```

Ensure database test connection is configured.

---

## 📄 Swagger Docs

Available at:  
`http://<service-host>:5000/docs`

---

## 🔐 Security

- Only authenticated users (via Gateway) can add products
- Input validation is performed on creation

---

## 👤 Author

Rommel Pachacama  
Universidad Central del Ecuador  
Distributed Programming – Final Project  
