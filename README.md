

# 🛒 Ecommerce Chatbot

## Backend Setup
A Django-based backend for an e-commerce platform. This project is designed with modularity and scalability in mind, featuring user authentication, a full-featured product store, and a chatbot system for real-time customer interaction.

---

## 📁 Project Structure

chatbot_store/
├── chatbot_store/ # Project settings, URLs, ASGI config
├── accounts/ # Handles user authentication (SimpleJWT)
├── store/ # Manages product catalog, cart, and orders
├── chat/ # Real-time chatbot logic and WebSocket handling
└── manage.py

yaml
Copy
Edit

---

## ✅ Features Implemented So Far

### 🔐 Authentication (JWT)
- Integrated [`djangorestframework-simplejwt`](https://github.com/jazzband/djangorestframework-simplejwt)
- Endpoints tested:
  - `POST /api/token/` — Obtain access and refresh token
  - `POST /api/token/refresh/` — Refresh access token
  - `POST /api/token/verify/` — Verify a given token

### 📦 Project Setup
- Initialized Django project `chatbot_store`
- Created three apps:
  - `accounts`: For user creation and authentication
  - `store`: For managing products, cart, and order data
  - `chat`: For chatbot logic (WebSocket/real-time)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/yourusername/chatbot_store.git
cd chatbot_store
```
### 2. Create and Activate a Virtual Environment
```python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```
pip install -r requirements.txt
```

### 4. Run Migrations
```
python manage.py migrate
```
### 5. Create a Superuser (Optional)
```
python manage.py createsuperuser
```
### 6. Start the Development Server
```
python manage.py runserver
```
