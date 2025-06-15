import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import Button from "../components/Button";
import { getImageUrl } from "../utils/getImageUrl";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`/store/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product", err));
  }, [id]);

  const handleAddToCart = () => {
    axios
      .post("/store/cart/add/", {
        product_id: product.id,
        quantity,
      })
      .then(() => alert("Added to cart!"))
      .catch((err) => console.error("Error adding to cart", err));
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const imageUrl = getImageUrl(product.image);

  return (
    <section className="flex flex-col lg:flex-row items-center max-container gap-10 py-12 px-4">
      {/* Image on left (top on mobile) */}
      <div className="flex-1 w-full">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full max-w-md object-contain mx-auto"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
      </div>

      {/* Details on right (bottom on mobile) */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-4xl font-bold font-palanquin">{product.name}</h2>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-2 text-3xl font-bold text-coral-red">
          ₹{parseFloat(product.price).toFixed(2)}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 px-2 py-1 border rounded"
          />
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-black text-white font-semibold rounded hover:bg-coral-red transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
