import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Balón Adidas", price: 25 },
    { id: "2", name: "Zapatos Nike", price: 60 }
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (!name || !price) return;
    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price: parseFloat(price)
    };
    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Panel Admin</h2>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Nombre del producto"
          className="w-full p-2 border rounded"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          className="w-full p-2 border rounded"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={addProduct}
        >
          Crear producto
        </button>
      </div>

      <div className="space-y-2">
        {products.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-gray-600">${p.price}</p>
            </div>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
