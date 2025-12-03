import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);


  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = Array.isArray(res.data)
        ? res.data
        : res.data.items || [];

      setCart(items);
      localStorage.setItem("cartData", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("cartData");
    if (saved) setCart(JSON.parse(saved));
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🧾 Place order
  const placeOrder = async () => {
    if (!form.name.trim() || !form.address.trim()) {
      alert("Please fill in all details before placing the order.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

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

      // 🧹 Clear cart after successful order
      await axios.post(
        "/api/cart/clear",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("cartData");
      setCart([]);
      setOrderPlaced(true);
      setStep(3);
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Cart" },
    { id: 2, title: "Details" },
    { id: 3, title: "Confirmation" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Checkout
        </h2>

        {/* Stepper */}
        <div className="flex justify-between mb-10">
          {steps.map((s) => (
            <div key={s.id} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step === s.id
                    ? "bg-green-500 text-white shadow-md scale-110"
                    : "bg-gray-200 text-gray-600"
                  }`}
              >
                {s.id}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {s.title}
              </p>
            </div>
          ))}
        </div>

        {/* Step 1: Cart */}
        {step === 1 && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center py-6">
                Your cart is empty.
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.productId || item._id}
                    className="flex justify-between items-center border-b py-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
                <div className="text-right mt-6">
                  <p className="text-xl font-bold text-gray-800">
                    Total: ₹{total}
                  </p>
                </div>
                <div className="text-right mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Proceed
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Delivery Details
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Delivery Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <select
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={placeOrder}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Order Placed Successfully!
            </h3>
            <p className="text-gray-600 mb-8">
              Thank you for shopping with us. Your order has been placed
              successfully.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
