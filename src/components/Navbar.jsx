import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Navbar = ({ admin }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadFromStorage = () => {
      const userString = localStorage.getItem("user");
      const cartData = localStorage.getItem("cart");

      if (userString) {
        try {
          setUser(JSON.parse(userString));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }

      if (cartData) {
        try {
          setCart(JSON.parse(cartData));
        } catch (error) {
          console.error("Failed to parse cart data:", error);
          localStorage.removeItem("cart");
        }
      } else {
        setCart([]);
      }
    };

    loadFromStorage();
    window.addEventListener("storage", loadFromStorage);
    return () => window.removeEventListener("storage", loadFromStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCart([]);
    navigate("/auth");
  };

  const getPortalTitle = () => {
    if (admin) return "Deliver At Door Admin";
    if (user?.role === "delivery_partner") return "Delivery Portal";
    if (user?.role === "customer") return "Customer Portal";
    return "Deliver At Door";
  };

  const getNavigationLinks = () => {
    if (admin) return null;
    if (user?.role === "delivery_partner") {
      return (
        <>
          <Link to="/delivery/dashboard">Dashboard</Link>
          <Link to="/delivery/orders">Orders</Link>
          <Link to="/delivery/profile">Profile</Link>
        </>
      );
    }

    if (user?.role === "customer") {
      return (
        <>
          <Link to="/">Home</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/profile">Profile</Link>
        </>
      );
    }

    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </>
    );
  };

  const CartSummary = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div className="relative">
        <button
          onClick={() => setShowCart(!showCart)}
          className="flex items-center bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
        >
          🛒 <span className="ml-2">{totalItems} items</span>
        </button>

        {showCart && (
          <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-lg z-20">
            <div className="p-4 border-b font-semibold">Your Cart</div>
            <ul className="max-h-64 overflow-y-auto">
              {cart.length === 0 ? (
                <li className="p-4 text-center text-gray-500">Cart is empty</li>
              ) : (
                cart.map((item, index) => (
                  <li key={index} className="flex justify-between p-2 border-b text-sm">
                    <span>{item.name}</span>
                    <span>{item.quantity} × ₹{item.price}</span>
                  </li>
                ))
              )}
            </ul>
            <div className="p-4 font-semibold text-right border-t">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-gray-950 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to={admin ? "/admin/dashboard" : "/"}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-gray-300"
            >
              {getPortalTitle()}
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-sm sm:text-base">
            {getNavigationLinks()}
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "customer" && <CartSummary />}
                <span className="hidden sm:flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-gray-300 text-xs sm:text-sm max-w-[140px] truncate">
                  <span className="text-green-400 text-lg">
                    {user.role === "delivery_partner" ? "🚚" : "👤"}
                  </span>
                  {user.name || user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-xl shadow transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-4 py-2 rounded-xl shadow transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-3 text-sm sm:text-base">
            <div className="flex flex-col space-y-2 border-t border-gray-700 pt-4">
              {getNavigationLinks()}
              {user ? (
                <>
                  {user.role === "customer" && <CartSummary />}
                  <span className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-gray-300">
                    <span className="text-green-400 text-lg">
                      {user.role === "delivery_partner" ? "🚚" : "👤"}
                    </span>
                    {user.name || user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-sm px-4 py-2 rounded-xl shadow"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded-xl shadow text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  admin: false,
};

Navbar.propTypes = {
  admin: PropTypes.bool,
};

export default Navbar;
