import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

 

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    
  };
  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");
  if (savedUser && savedToken) {
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
    setToken(savedToken);
    console.log("AuthContext: User restored from localStorage:", parsedUser);
  }
}, []);






  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
