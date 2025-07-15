import { useEffect, useState, useContext } from "react";
import { getOrdersByUserId } from "../services/orderService";
import type { Order } from "../services/orderService";
import { AuthContext } from "../context/AuthContext";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      try {
        const result = await getOrdersByUserId(user.id);
        setOrders(result);
      } catch (err) {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  if (!user) return <div className="p-6 text-center">You must be logged in.</div>;
  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Product ID: {order.product_id}</p>
                <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
              </div>
              <span className="text-sm text-gray-400">Order ID: {order.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
