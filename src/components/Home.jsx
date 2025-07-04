import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import trackingImg from "../assets/tracking.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-snug">
          Autonomous Delivery System
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Deliver smarter with real-time tracking, instant order placement, and seamless order history.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap mt-6">
          <button
            onClick={() => navigate("/ordercontext")}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Order Now
          </button>
          <button
            onClick={() => navigate("/orderspage")}
            className="w-full sm:w-auto bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-50 transition"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate("/order-history")}
            className="w-full sm:w-auto bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-50 transition"
          >
            Order History
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition">
          <div className="text-blue-600 text-4xl sm:text-5xl mb-3">📦</div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">Instant Orders</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Place new delivery orders in seconds with a simplified process.
          </p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition">
          <div className="text-green-600 text-4xl sm:text-5xl mb-3">📍</div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">Live Tracking</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            View real-time GPS locations of all your active deliveries.
          </p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition">
          <div className="text-indigo-600 text-4xl sm:text-5xl mb-3">🕒</div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">Order History</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Access past delivery records with full order and status details.
          </p>
        </div>
      </section>

      {/* Image Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <img
          src={trackingImg}
          alt="Delivery Illustration"
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
