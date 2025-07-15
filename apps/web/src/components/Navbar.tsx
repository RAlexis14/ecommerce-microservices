import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black text-white p-4 shadow flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Fútbol Total RM</Link>
      </div>
      <ul className="flex space-x-4 items-center text-sm">
        <li>
          <Link to="/products" className="hover:text-green-400">
            Products
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/cart" className="hover:text-green-400">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-green-400">
                Orders
              </Link>
            </li>
            {user.role === "admin" && (
              <li>
                <Link to="/admin" className="hover:text-yellow-400">
                  Admin
                </Link>
              </li>
            )}
            <li className="text-gray-400">
              {user.name} ({user.role ?? "user"})
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/login" className="hover:text-green-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-400">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
