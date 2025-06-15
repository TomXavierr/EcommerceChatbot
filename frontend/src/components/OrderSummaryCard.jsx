import { getImageUrl } from "../utils/getImageUrl";

const OrderSummaryCard = ({ order }) => {
  return (
    <div className="border rounded-lg p-4 shadow mb-6">
      <h3 className="font-bold text-lg mb-2">Order #{order.id}</h3>
      <p className="text-sm text-gray-500 mb-4">Ordered at: {new Date(order.ordered_at).toLocaleString()}</p>
      {order.items.map(({ id, product, quantity }) => (
        <div key={id} className="flex gap-4 mb-4">
          <img src={getImageUrl(product.image)} alt={product.name} className="w-20 h-20 object-cover rounded" />
          <div>
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-sm text-gray-600">Quantity: {quantity}</p>
            <p className="text-sm text-coral-red font-semibold">₹{parseFloat(product.price).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="text-right font-bold text-lg text-black">
        Total: ₹{parseFloat(order.total).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderSummaryCard;