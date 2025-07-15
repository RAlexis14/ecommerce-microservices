import API from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

// ✅ Fetch a single product by ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await API.get(`/products/list/${id}`);
  return response.data as Product;
};

// ✅ Fetch all available products by testing sequential IDs
export const fetchAllProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];

  for (let id = 1; id <= 20; id++) {
    try {
      const response = await API.get(`/products/list/${id}`);
      const product = response.data as Product;
      
      if (product && product.name) {
        products.push(product);
      }
    } catch (error: any) {
      
      if (error.response?.status !== 404) {
        console.error(`Error fetching product ${id}:`, error.message);
      }
    }
  }

  return products;
};
