import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("next");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 🛒 Fetch cart from API and store in localStorage
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = Array.isArray(res.data)
        ? res.data
        : res.data.items || [];
      setCart(items);
      localStorage.setItem("cartData", JSON.stringify(items));
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  // Load from localStorage first
  useEffect(() => {
    const saved = localStorage.getItem("cartData");
    if (saved) setCart(JSON.parse(saved));
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Place Order API (from OrderPage)
  const handleConfirm = async () => {
    if (!form.name || !form.address) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/orders/place-order",
        {
          name: form.name,
          address: form.address,
          payment: form.payment,
          items: cart,
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderPlaced(true);
      setDirection("next");
      setStep(3);

      // 🧹 Clear cart and localStorage
      setCart([]);
      localStorage.removeItem("cartData");
      setForm({ name: "", address: "", payment: "Cash on Delivery" });
    } catch (err) {
      alert("Order failed, please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Stepper = () => {
    const steps = ["Cart", "Details", "Confirmation"];
    const progressPercent = ((step - 1) / (steps.length - 1)) * 100;

    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2 relative">
          {steps.map((label, index) => {
            const current = index + 1;
            const isActive = step === current;
            const isCompleted = step > current;
            return (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-500 ease-in-out ${isCompleted
                      ? "bg-green-600 text-white scale-110"
                      : isActive
                        ? "bg-green-100 text-green-700 scale-125"
                        : "bg-gray-200 text-gray-600 scale-100"
                    }`}
                >
                  {current}
                </div>
                <span className="text-sm mt-2 text-gray-700">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-gray-300 rounded-full">
          <div
            className="absolute h-1 bg-green-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-lg mt-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Checkout
      </h2>

      <Stepper />

      <div className="relative min-h-[400px]">
        {/* Step 1: Cart */}
        {step === 1 && (
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${direction === "next" ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg mb-3 shadow-sm transition transform hover:scale-105 duration-300"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-gray-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))
              )}
              <div className="flex justify-between items-center mt-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Total: ₹{total}
                </h3>
                <button
                  onClick={() => {
                    setDirection("next");
                    setStep(2);
                  }}
                  disabled={cart.length === 0}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${direction === "next" ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Your Details</h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    name="payment"
                    value={form.payment}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg shadow mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Total: ₹{total}
                </h3>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => {
                      setDirection("back");
                      setStep(1);
                      const saved = localStorage.getItem("cartData");
                      if (saved) setCart(JSON.parse(saved));
                    }}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    {loading ? "Placing..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="absolute inset-0 transition-transform duration-500 ease-in-out">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              {orderPlaced ? (
                <>
                  <h3 className="text-2xl font-bold text-green-700 mb-4 animate-pulse">
                    🎉 Order Confirmed!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Thank you! Your order has been placed successfully.
                  </p>
                  <p className="text-gray-500 mb-6">
                    You will receive a confirmation email shortly.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Back to Home
                  </button>
                </>
              ) : (
                <p className="text-gray-600 text-lg">Processing order...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
