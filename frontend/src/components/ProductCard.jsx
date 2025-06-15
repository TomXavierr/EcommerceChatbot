import { useNavigate } from "react-router-dom";
// import { getImageUrl } from "../utils/getImageUrl";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
//   const imageUrl = getImageUrl();

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")}${
        product.image
      }`;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer w-fit border p-4 rounded-lg shadow hover:shadow-lg   transition duration-300"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="w-[280px] h-[280px] object-cover rounded"
        onError={(e) => {
          e.target.src = "/placeholder.jpg";
        }}
      />

      <h3 className="mt-2 text-xl font-semibold text-gray-800">
        {product.name}
      </h3>
      <p className="mt-1 text-lg font-bold text-coral-red">
        ₹{parseFloat(product.price).toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
