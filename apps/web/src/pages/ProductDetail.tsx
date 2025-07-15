import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProductById(Number(id))
        .then(setProduct)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error || !product) return <p className="text-red-600 text-center">{error || "Producto no encontrado"}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={product.image || "/mock-product.png"}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-600 my-2">{product.description}</p>
      <p className="text-green-600 text-xl font-semibold">${product.price}</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => addToCart(product.id, 1)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
