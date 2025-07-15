import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../services/productService";
import type { Product } from "../services/productService";

export default function CartFloat() {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [productMap, setProductMap] = useState<Record<number, Product>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchAllProducts();
      const map: Record<number, Product> = {};
      for (const p of products) {
        map[p.id] = p;
      }
      setProductMap(map);
    };

    loadProducts();
  }, []);

  const subtotal = cart.reduce((acc, item) => {
    const product = productMap[item.product_id];
    return acc + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-40 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
        onClick={() => setOpen(!open)}
      >
        🛒 {cart.length} {cart.length === 1 ? "item" : "items"}
      </button>

      {open && (
        <div className="fixed right-0 bottom-0 w-80 h-full bg-white border-l shadow-lg z-30 p-4 overflow-y-auto animate-slide-in">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Empty</p>
          ) : (
            cart.map((item) => {
              const product = productMap[item.product_id];
              return (
                <div key={item.product_id} className="flex justify-between items-center mb-2 border-b pb-2">
                  <div>
                    <p className="font-semibold">{product?.name ?? "Unnamed"}</p>
                    <p className="text-sm text-gray-600">
                      ${product?.price?.toFixed(2) ?? "0.00"} x {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div className="mt-4 text-right font-bold text-lg">
            Total: ${subtotal.toFixed(2)}
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/cart");
              }}
              className="w-full bg-gray-200 rounded py-2 text-sm"
            >
              View Cart
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/checkout");
              }}
              className="w-full bg-green-600 text-white py-2 rounded text-sm"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
