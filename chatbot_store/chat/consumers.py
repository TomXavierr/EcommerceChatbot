import json
from datetime import datetime
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils.timezone import now
from django.contrib.auth import get_user_model
from django.utils.timezone import now, localtime

from .nlp_utils import extract_keywords

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("[ChatConsumer] WebSocket connection accepted")
        await self.accept()
        await self.send(text_data=json.dumps({
            "sender": "bot",
            "message": "Hello! I'm your assistant. How can I help you today?"
        }))

    async def disconnect(self, close_code):
        print(f"[ChatConsumer] WebSocket disconnected with code: {close_code}")

    async def receive(self, text_data):
        print(f"[ChatConsumer] Received data: {text_data}")
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError as e:
            print(f"[ChatConsumer] JSON decode error: {e}")
            await self.send_bot_message("Sorry, I could not understand your message format.")
            return
        
        user_id = data.get("user_id")
        user_msg = data.get("message", "").strip()
        print(f"[ChatConsumer] user_id: {user_id}, user_msg: '{user_msg}'")

        if not user_id:
            print("[ChatConsumer] user_id not provided in message")
            await self.send_bot_message("Error: user_id not provided.")
            return

        User = get_user_model()
        try:
            user = await database_sync_to_async(User.objects.get)(id=user_id)
        except User.DoesNotExist:
            print(f"[ChatConsumer] No user found with id {user_id}")
            await self.send_bot_message("User not found.")
            return
        
        if data.get("load_history"):
            print("[ChatConsumer] Loading today's message history")
            history = await self.load_today_messages(user)
            for msg in history:
                await self.send(text_data=json.dumps({
                    "sender": msg["sender"],
                    "message": msg["message"],
                }))
            return

        if user_msg:
            print(f"[ChatConsumer] Saving user message: {user_msg}")
            await self.save_message(user, "user", user_msg)

            response = await self.handle_query(user, user_msg)
            print(f"[ChatConsumer] Bot response: {response}")

            await self.save_message(user, "bot", response["text"])

            await self.send(text_data=json.dumps(response))
        else:
            print("[ChatConsumer] Empty user message received")

    async def handle_query(self, user, message):
        from store.models import Product

        keywords = extract_keywords(message)
        print(f"[ChatConsumer] Extracted keywords: {keywords}")

        category_kw = keywords.get("category")
        product_kw = keywords.get("product")

        if message.lower() in ["hi", "hello", "hey"]:
            return {"text": "Hello! How can I assist you today?"}

        if category_kw:
            # Filter by category only
            def filter_by_category():
                qs = Product.objects.filter(category__name__icontains=category_kw)
                return list(qs.values("id", "name"))
            products = await database_sync_to_async(filter_by_category)()
            search_term = category_kw

        elif product_kw:
            # Filter by product name only
            def filter_by_product():
                qs = Product.objects.filter(name__icontains=product_kw)
                return list(qs.values("id", "name"))
            products = await database_sync_to_async(filter_by_product)()
            search_term = product_kw

        else:
            return {"text": "Sorry, I didn't understand that. Could you please specify what product or category you are looking for?"}

        if len(products) == 1:
            product = products[0]
            product_link = f"/products/{product['id']}/"
            return {
                "text": f"I found one product: {product['name']}. You can see more details here: {product_link}"
            }
        elif len(products) > 1:
            # store_link = f"/store?search={search_term}" if product_kw else f"/store?category={search_term}"
            store_link = f"/store?category={search_term}" if category_kw else f"/store?search={search_term}"
            return {
                "text": f"I found {len(products)} products matching your query. Check them out here: {store_link}"
            }
        else:
            return {"text": "No products found matching your description."}


    @database_sync_to_async
    def save_message(self, user, sender, message):
        user.chatmessage_set.create(sender=sender, message=message)
    
    @database_sync_to_async
    def load_today_messages(self, user):
        today = localtime(now()).date()
        return list(
            user.chatmessage_set.filter(
                timestamp__date=today
            ).order_by("timestamp").values("sender", "message")
        )
