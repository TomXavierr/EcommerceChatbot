# 🛒 Ecommerce Chatbot – Project Report
## 📌 Project Overview
**Project Title:** Ecommerce Chatbot
**Objective:** To create a conversational chatbot interface for an ecommerce store that allows users to interact with the product catalog, manage carts, and place orders using natural language queries.

## 🧱 Technology Stack
### ⚙️ Backend
- Django 5.2.2 – Web framework

- Django REST Framework – API development

- SimpleJWT – Authentication with access and refresh tokens

- Channels + Redis – WebSocket-based real-time communication

- drf-yasg – API documentation (Swagger UI)

- SQLite – Development database

### 🌐 Frontend
- React + Vite – Frontend development

- Tailwind CSS – UI styling

- Axios – API requests

- React Router – Navigation and routing

## 💬 Features
### 1. 🛍️ Store Interface
- Browse products with filtering by category

- View product details

- Add/remove items from cart

- Place orders

### 2. 🤖 Chatbot Interface
- Icon-based toggle chat interface

- Real-time conversation using Django Channels

- Recognizes keywords (e.g., laptop, phone)

- Returns matching products with quick links

- Handles commands like:

   -“Show me laptop”


### 3. 🧾Cart and Orders Page
- Place order

- “Continue Shopping” & “See Order Summary” CTA after order placement
  
- View past orders

## 🔐 Authentication
- JWT access/refresh token system using djangorestframework-simplejwt

- Token auto-refresh mechanism implemented in React using Axios interceptors

## 🔗 Sample API Endpoints
| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| POST   | `/api/token/`                      | Get access/refresh tokens |
| POST   | `/api/token/refresh/`              | Refresh access token      |
| POST   | `/api/accounts/register/`          | Register New User         |
| GET    | `/api/store/products/`             | List all products         |
| GET    | `/api/store/products/<id>/`        | Get product details       |
| POST   | `/api/store/cart/add/`             | Add product to cart       |
| DELETE | `api/store/cart/item/<id>/remove/` | Remove product from cart  |
| POST   | `api/store/orders/create/`         | Place an order            |
| GET    | `/api/store/orders/`               | Get all past orders       |


## 🧪 Sample Queries & Responses Of Chatbot
Query: “Show me laptop”<br>
Bot:
*"I found 18 products matching your query. Check them out here: /store?category=laptop"*


## 📝 Future Improvements
- Use NLP models for better user intent parsing and better responses according to site database.

- Support payment gateway (e.g., Razorpay/Stripe)

- Admin dashboard with analytics

## 🧑‍💻 Author
**Name:** Tom Xavier
**Email:** tomxavieronthego@gmail.com
