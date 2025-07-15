import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/userService";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await loginUser({ email, password });

      if (!res.token || !res.user || res.user.id === undefined) {
        throw new Error("Invalid login response");
      }

      const typedUser = {
        id: Number(res.user.id),
        name: res.user.name ?? "",
        email: res.user.email ?? "",
        role: res.user.role ?? "user"
      };

      login(typedUser, res.token);
      navigate("/products");
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
