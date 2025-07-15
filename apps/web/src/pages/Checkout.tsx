import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) return;

    setLoading(true);
    try {
      for (const item of cart) {
        await createOrder({
          user_id: user.id,
          product_id: item.product_id,
          quantity: item.quantity,
        });
      }
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p className="mb-4 text-sm text-gray-600">
        Confirm your order and shipping information.
      </p>
      {/* Optional: Add form for address and phone number */}
      <button
        onClick={handleCheckout}
        className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
