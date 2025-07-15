import { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/productService";
import type { Product } from "../services/productService";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
  const loadProducts = async () => {
    try {
      const result = await fetchAllProducts();
      console.log("Productos cargados:", result); 
      setProducts(result);
    } catch (err) {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);


  if (loading) return <div className="text-center mt-8">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1 mb-2">{product.description}</p>
            <p className="text-green-600 font-semibold">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <button
                className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700"
                 onClick={() => addToCart(product.id, 1)}
              >
                  Add to Cart
              </button>



          </div>
        ))
      )}
    </div>
  );
}
