import API from "./api";

export interface Order {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

// Place a new order
export const createOrder = async (order: Order): Promise<void> => {
  await API.post("/create", order);
};

// Get all orders by user ID
export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  const response = await API.get<Order[]>(`/list/${userId}`);
return response.data;

};
