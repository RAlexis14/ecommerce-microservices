import { useEffect, useState } from "react";

export default function NotificationMock() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const mensajes = [
        "⚽ New Puma ball available!",
          "👟 Discount on Nike shoes",
        "📦 Official 2025 jerseys have arrived",
        "🔥 Promotion on training gear"
      ];
      const random = mensajes[Math.floor(Math.random() * mensajes.length)];
      setMensaje(random);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!mensaje) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white py-2 px-4 rounded shadow-md z-20 max-w-xs animate-pulse">
      {mensaje}
    </div>
  );
}
