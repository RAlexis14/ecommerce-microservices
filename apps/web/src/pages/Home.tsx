import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-green-700">Bienvenido a Fútbol Total RM</h1>
      <p className="text-gray-700 mt-4">Tu tienda confiable para fútbol amateur en Quito 🇪🇨</p>
      <img
        src="/mock-home.jpg"
        alt="Fútbol Total"
        className="mx-auto mt-6 rounded shadow-lg w-full max-w-2xl"
      />
      <Link
        to="/products"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Ver productos
      </Link>
    </div>
  );
}
