import API from "./api";

export interface CartItem {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

// Fetch cart items by user ID
export const getCartByUserId = async (userId: number): Promise<CartItem[]> => {
  const response = await API.get<CartItem[]>(`/cart/get/${userId}`);
return response.data;

};

// Add a new item to the cart
export const addToCart = async (item: CartItem): Promise<void> => {
  await API.post("/cart/add", item);
};

// Clear all items from a user's cart
export const clearCartByUserId = async (userId: number): Promise<void> => {
  await API.delete(`/cart/clear/${userId}`);
};
