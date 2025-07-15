import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCartByUserId,
  addToCart as addItem,
  clearCartByUserId,
} from "../services/cartService";

import type { CartItem } from "../services/cartService";
import { AuthContext } from "./AuthContext";

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  clearCart: () => void;
  removeFromCart?: (productId: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState<CartItem[]>([]);

useEffect(() => {
  // 🔍 Imprime el objeto user completo
  console.log("CartContext: current user", user);

  // ❗ Si no hay user o no hay ID, detenemos
  if (!user?.id) {
    console.warn("CartContext: No user ID available.");
    return;
  }

  const loadCart = async () => {
    try {
      console.log("CartContext: Loading cart for user", user.id);
      const items = await getCartByUserId(user.id);
      setCart(items);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  loadCart();
}, [user]);



  const addToCart = async (productId: number, quantity: number) => {
    if (!user?.id) return;

    const newItem: CartItem = {
      user_id: user.id,
      product_id: productId,
      quantity,
    };

    try {
      await addItem(newItem);
      const updated = await getCartByUserId(user.id);
      setCart(updated);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  const clearCart = async () => {
    if (!user?.id) return;
    try {
      await clearCartByUserId(user.id);
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
