# 🛒 Chatbot-Powered E-commerce Store
An e-commerce web application with an intelligent chatbot assistant to guide users from product discovery to checkout. Built with Django Rest Framework, React, WebSockets, and JWT Authentication.

# 📌 Features
- 🔐 JWT-based user authentication (SimpleJWT)

- 🛍 Product browsing, filtering by category

- 🧺 Cart & order management

- 🤖 Chatbot assistant (WebSocket-based)

   - Product search via chat

  - Cart manipulation via chat

  - Quick filtering and navigation

- 📦 RESTful APIs for frontend/backend communication

- ⚡️ Responsive frontend built with Vite + React + TailwindCSS

# 🧠 Tech Stack
- Backend: Django 5.2.2, Django REST Framework, Channels

- Frontend: React + Vite + TailwindCSS

- Authentication: SimpleJWT

- Chat: WebSockets (Django Channels)

- Database: SQLite (dev) 

- State Management: React Context API

# 🚀 Project Setup
##🔧 Backend Setup (Django)
```
# Navigate to backend folder
cd chatbot_store

# Create and activate virtual environment at project root (if not already done)
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r ../requirements.txt

# Run initial migrations
python manage.py migrate

# Create a superuser to access the Django admin panel
python manage.py createsuperuser

# Load dummy product data 
python manage.py seed_products

# Run the development server
daphne chatbot_store.asgi:application
```
Make sure Django runs on http://localhost:8000

💻 Frontend Setup (React)
```
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
React app runs at http://localhost:5173 by default


#💬 WebSocket Chatbot Functionality
- Product discovery via keywords:

   *"I'm looking for a red laptop"*

- Filter products by category via chat widgets

- Clear chat 

- WebSocket URL: ws://localhost:8000/ws/chat/


# 📦 API Overview
POST /api/token/ — Login

POST /api/token/refresh/ — Refresh token

GET /api/products/ — List products

GET /api/products/<id>/ — Product detail

GET /api/store/cart/ — View cart

POST /api/store/cart/add/ — Add to cart

DELETE api/store/cart/item/<item: id>/remove/ - Remmove item from cart

GET /api/store/orders/ — List orders

POST api/store/orders/create/ — Create order



