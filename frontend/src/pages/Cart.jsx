import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.jpg";
  return imagePath.startsWith("http")
    ? imagePath
    : `${BACKEND_BASE_URL.replace(/\/+$/, "")}${imagePath}`;
};

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/store/cart/");
        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };

    fetchCart();
  }, []);

  const placeOrder = async () => {
    if (!cart || cart.items.length === 0) return;

    setLoading(true);
    try {
      const res = await axios.post("/store/orders/create/", {
        cart_id: cart.id,
      });

      setOrderPlaced({
        orderId: res.data.id,
        total: res.data.total,
        time: res.data.ordered_at,
        items: cart.items,
      });
      setCart(null);
    } catch (error) {
      console.error("Failed to place order", error);
      setOrderPlaced({ error: "Failed to place order. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ---- Order Placed UI ----
  if (orderPlaced && !orderPlaced.error) {
    return (
      <div className="max-w-2xl mx-auto mt-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mb-2">
          Order ID: <strong>{orderPlaced.orderId}</strong>
        </p>
        <p className="text-gray-700 mb-2">
          Ordered At:{" "}
          <strong>{new Date(orderPlaced.time).toLocaleString()}</strong>
        </p>
        <p className="text-lg font-semibold text-black mt-4">
          Total: ₹{parseFloat(orderPlaced.total).toFixed(2)}
        </p>

        <div className="mt-8 space-y-4 text-left">
          {orderPlaced.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 border rounded shadow-sm"
            >
              <img
                src={getImageUrl(item.product.image)}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹
                  {parseFloat(item.product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link to="/store">
            <button className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800">
              Continue Shopping
            </button>
          </Link>
          <Link to="/orders">
            <button className="px-5 py-2 border border-gray-500 rounded hover:bg-gray-100">
              View Order Summary
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ---- Empty cart or error ----
  if (!cart)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (cart.items.length === 0)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <Link to="/store">
          <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Continue Shopping
          </button>
        </Link>
      </div>
    );

  // ---- Cart Display ----
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.quantity * (item.product.price || 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center space-x-4">
              <img
                src={getImageUrl(item.product.image)}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold text-lg">{item.product.name}</p>
                <p className="text-gray-500">
                  Price: ₹{(Number(item.product.price) || 0).toFixed(2)}
                </p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="text-right font-semibold">
              ₹{(item.quantity * item.product.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex flex-col items-end space-y-3">
        <p className="text-lg">
          Total Items: <span className="font-semibold">{totalQuantity}</span>
        </p>
        <p className="text-xl">
          Total Price:{" "}
          <span className="font-bold text-green-600">
            ₹{totalPrice.toFixed(2)}
          </span>
        </p>

        {orderPlaced?.error && (
          <p className="mt-2 text-red-600">{orderPlaced.error}</p>
        )}

        <button
          disabled={loading}
          onClick={placeOrder}
          className={`mt-4 px-6 py-3 rounded-md text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
