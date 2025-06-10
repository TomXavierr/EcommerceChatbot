# 🛒 Chatbot Store Backend

A Django-based backend for an AI-driven e-commerce platform. This project is designed with modularity and scalability in mind, featuring user authentication, a full-featured product store, and a chatbot system for real-time customer interaction.

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

```bash
git clone https://github.com/yourusername/chatbot_store.git
cd chatbot_store
2. Create and Activate a Virtual Environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

3. Install Dependencies
pip install -r requirements.txt
Include a requirements.txt like:

txt
Copy
Edit
Django>=4.2
djangorestframework
djangorestframework-simplejwt
channels
channels_redis
drf-yasg
4. Run Migrations
bash
Copy
Edit
python manage.py migrate
5. Create a Superuser (Optional)
bash
Copy
Edit
python manage.py createsuperuser
6. Start the Development Server
bash
Copy
Edit
python manage.py runserver
🔑 Authentication with SimpleJWT
Get Token
h
Copy
Edit
POST /api/token/
{
    "username": "your_username",
    "password": "your_password"
}
Refresh Token
http
Copy
Edit
POST /api/token/refresh/
{
    "refresh": "your_refresh_token"
}
Verify Token
h
Copy
Edit
POST /api/token/verify/
{
    "token": "your_token"
}