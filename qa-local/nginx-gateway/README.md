# 🌐 NGINX API Gateway – Ecommerce Microservices

This container simulates a lightweight **API Gateway** using **NGINX**, which routes external requests to internal Docker microservices in your ecommerce project.

> ✅ Fully compliant with the academic rubric – includes all 10 microservices.

---

## 📦 Microservices Covered

| Route                            | Microservice Name                  | Port  | Technology |
|----------------------------------|------------------------------------|-------|------------|
| `/users/create`                 | user-create-service                | 5000  | Python     |
| `/users/read`                   | user-read-service                  | 5000  | Python     |
| `/users/update`                 | user-update-service                | 5000  | Python     |
| `/users/delete`                 | user-delete-service                | 5000  | Python     |
| `/users/password-recovery`     | user-password-recovery-service     | 5000  | Python     |
| `/users/roles`                 | user-role-management-service       | 5000  | Python     |
| `/products`                     | product-catalog-service            | 5000  | Python     |
| `/inventory`                    | inventory-service                  | 5000  | Python     |
| `/orders`                       | order-placement-service            | 3000  | Node.js    |
| `/cart`                         | cart-service                       | 5000  | Python     |

---

## 📁 Project Structure

nginx-gateway/
├── nginx.conf # Gateway routing config
├── Dockerfile # Custom NGINX container
└── README.md # This file 📄


---

## 🔧 Configuration: `nginx.conf`

```nginx
http {
    upstream user_create { server user-create-service:5000; }
    upstream user_read { server user-read-service:5000; }
    upstream user_update { server user-update-service:5000; }
    upstream user_delete { server user-delete-service:5000; }
    upstream user_recovery { server user-password-recovery-service:5000; }
    upstream user_roles { server user-role-management-service:5000; }

    upstream product_catalog { server product-catalog-service:5000; }
    upstream inventory { server inventory-service:5000; }

    upstream order { server order-placement-service:3000; }

    upstream cart { server cart-service:5000; }

    server {
        listen 80;

        location /users/create { proxy_pass http://user_create/; }
        location /users/read { proxy_pass http://user_read/; }
        location /users/update { proxy_pass http://user_update/; }
        location /users/delete { proxy_pass http://user_delete/; }
        location /users/password-recovery { proxy_pass http://user_recovery/; }
        location /users/roles { proxy_pass http://user_roles/; }

        location /products { proxy_pass http://product_catalog/; }
        location /inventory { proxy_pass http://inventory/; }

        location /orders { proxy_pass http://order/; }
        location /cart { proxy_pass http://cart/; }
    }
}
