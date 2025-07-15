import API from "./api";

interface AuthData {
  email: string;
  password: string;
  name?: string;
}

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
  token?: string; 
}


export const loginUser = async (data: AuthData): Promise<LoginResponse> => {
const response = await API.post<LoginResponse>("/users/create", data);

  const user = response.data.user ?? response.data; 
  const token = response.data.token ?? "mocked-token";

  return { user, token };
};

export const registerUser = async (data: AuthData): Promise<LoginResponse> => {

const response = await API.post<LoginResponse>("/users/create", data);
  const user = response.data.user ?? response.data;
  const token = response.data.token ?? "mocked-token";
  return { user, token };
};
