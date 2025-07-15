import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { fetchAllProducts } from "../services/productService";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../services/productService";


export default function Cart() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [productMap, setProductMap] = useState<Record<number, Product>>({});

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

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <Link to="/products" className="text-green-600 underline">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.map(item => {
        const product = productMap[item.product_id];
        return (
          <div key={item.product_id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">{product?.name ?? "Unnamed"}</p>
              <p className="text-gray-600">
                ${product?.price?.toFixed(2) ?? "0.00"} x {item.quantity}
              </p>
            </div>
          </div>
        );
      })}
      <div className="mt-4 text-right font-bold text-lg">
        Subtotal: ${subtotal.toFixed(2)}
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button onClick={clearCart} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
