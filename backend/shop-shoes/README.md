# Shop Shoes Backend

Đây là backend cho ứng dụng bán giày được xây dựng bằng Spring Boot.

## Cấu trúc thư mục

```
src/main/java/com/shop_shoes/
├── config/         # Cấu hình ứng dụng
├── controller/     # Xử lý các request HTTP
├── dto/           # Data Transfer Objects
├── model/         # Các entity/model
├── repository/    # Interface tương tác với database
├── service/       # Business logic
└── utils/         # Các tiện ích
```

## Công nghệ sử dụng

- Java
- Spring Boot
- Spring Data JPA
- MySQL/PostgreSQL
- Maven

## Cài đặt và chạy

1. Clone repository
2. Cấu hình database trong `application.properties`
3. Chạy lệnh:
```bash
mvn spring-boot:run
```

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register

### Products
- GET /api/products
- GET /api/products/{id}
- POST /api/products
- PUT /api/products/{id}
- DELETE /api/products/{id}

### Orders
- GET /api/orders
- GET /api/orders/{id}
- POST /api/orders
- PUT /api/orders/{id}

### Users
- GET /api/users
- GET /api/users/{id}
- PUT /api/users/{id}
- DELETE /api/users/{id}

## Liên hệ

Nếu có thắc mắc hoặc góp ý, vui lòng liên hệ qua email: [your-email@example.com] 