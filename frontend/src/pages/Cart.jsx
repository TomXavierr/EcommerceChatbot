import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const { user } = useAuth();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    return `${BACKEND_BASE_URL}${imagePath}`;
  };

  useEffect(() => {
    console.log("Cart page loaded");
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
    setOrderStatus(null);

    try {
      const res = await axios.post("/store/order/", {
        // Assuming your backend needs cart id or items - adjust accordingly
        cart_id: cart.id,
      });

      setOrderStatus("Order placed successfully!");
      setCart(null); // clear cart UI or refetch cart as empty
    } catch (error) {
      console.error("Failed to place order", error);
      setOrderStatus("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (cart.items.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">Your cart is empty</p>
    );

  // Calculate total quantity and price
  const totalQuantity = cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
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

        {orderStatus && (
          <p
            className={`mt-2 ${
              orderStatus.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {orderStatus}
          </p>
        )}

        <button
          disabled={loading || cart.items.length === 0}
          onClick={placeOrder}
          className={`mt-4 px-6 py-3 rounded-md text-white font-semibold transition ${
            loading || cart.items.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
