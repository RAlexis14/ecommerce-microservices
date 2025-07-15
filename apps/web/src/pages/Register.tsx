import { useState, useContext } from "react";
import { registerUser } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
  name: string;
  email: string;
  password: string;
}>({
  name: "",
  email: "",
  password: "",
});


  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      
      // Ensure role is always a string
      const user = { ...res.user, role: res.user.role ?? "user" };
if (!res.token) {
  throw new Error("Token is missing from response");
}

login(user, res.token);
      navigate("/products");
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700"
      >
        Create Account
      </button>
    </form>
  );
}
