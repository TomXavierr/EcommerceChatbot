from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartSerializer, CartItemSerializer, OrderSerializer
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Query params for search and category
search_param = openapi.Parameter(
    'search', openapi.IN_QUERY, description="Search by product name", type=openapi.TYPE_STRING
)
category_param = openapi.Parameter(
    'category', openapi.IN_QUERY, description="Filter by category name", type=openapi.TYPE_STRING
)

class ProductListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @swagger_auto_schema(manual_parameters=[search_param, category_param])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get("search")
        category_query = self.request.query_params.get("category")

        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        elif category_query:
            queryset = queryset.filter(category__name__icontains=category_query)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: CartSerializer})
    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["product_id", "quantity"],
            properties={
                'product_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'quantity': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        responses={200: "Item added"}
    )
    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        product = get_object_or_404(Product, id=product_id)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()
        return Response({"message": "Item added to cart."})


class UpdateCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["quantity"],
            properties={
                'quantity': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        responses={200: openapi.Response('Cart item updated')}
    )
    def put(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.quantity = request.data.get('quantity', cart_item.quantity)
        cart_item.save()
        return Response({"message": "Cart item updated."})


class RemoveCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: openapi.Response('Item removed')})
    def delete(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.delete()
        return Response({"message": "Item removed from cart."})


class ClearCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: openapi.Response('Cart cleared')})
    def delete(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        cart.items.all().delete()
        return Response({"message": "Cart cleared."})


class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={201: openapi.Response("Order created", OrderSerializer),
                   400: "Cart is empty"}
    )
    def post(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        if not cart.items.exists():
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        total = sum([item.product.price * item.quantity for item in cart.items.all()])
        order = Order.objects.create(user=request.user, total=total)
        
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )

        cart.items.all().delete()
        serializer = OrderSerializer(order)

        return Response({
            "message": "Order placed successfully.",
            "order": serializer.data
        }, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: OrderSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-ordered_at')
