import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import OrderSummaryCard from '../components/OrderSummaryCard';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/store/orders/')
      .then(res => setOrders(res.data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="padding-x py-10 max-container">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {orders.length ? (
        orders.map(order => <OrderSummaryCard key={order.id} order={order} />)
      ) : (
        <p>No orders yet.</p>
      )}
    </section>
  );
};

export default Orders;