from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListView.as_view()),
    path('products/<int:pk>/', views.ProductDetailView.as_view()),

    path('cart/', views.CartView.as_view()),
    path('cart/add/', views.AddToCartView.as_view()),
    path('cart/item/<int:item_id>/update/', views.UpdateCartItemView.as_view()),
    path('cart/item/<int:item_id>/remove/', views.RemoveCartItemView.as_view()),
    path('cart/clear/', views.ClearCartView.as_view()),

    path('orders/', views.OrderListView.as_view()),
    path('orders/create/', views.CreateOrderView.as_view()),
]
