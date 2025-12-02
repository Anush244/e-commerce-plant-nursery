import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bestSelling from "../flower.json";
import { useCart } from "./CartContext"; 
import y from '../assets/y.png';
import i from '../assets/i.png';
import x from '../assets/x.png';
import fa from '../assets/fa.png';
import green from '../assets/green.png';

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const scrollRef = useRef(null);
  const { setCartCount } = useCart();


  // 🛒 Fetch Cart from backend
  const fetchCart = async () => {
    setLoading(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        setCart([]);
        setCartCount(0);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = Array.isArray(res.data)
        ? res.data
        : res.data.items || [];

      setCart(items);
      const totalCount = items.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      setCartCount(totalCount);
    } catch (error) {
      console.error(" Fetch cart error:", error?.response || error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to fetch cart. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  
  const updateQty = async (productId, type) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (updating[productId]) return;
      setUpdating((s) => ({ ...s, [productId]: true }));

      setCart((prev) => {
        const updated = prev.map((item) => {
          if ((item.productId || item.id) !== productId) return item;

          const nextQuantity =
            type === "inc"
              ? item.quantity + 1
              : item.quantity > 1
              ? item.quantity - 1
              : 1;

          return {
            ...item,
            quantity: nextQuantity,
          };
        });

        const totalCount = updated.reduce(
          (sum, cartItem) => sum + (cartItem.quantity || 1),
          0
        );
        setCartCount(totalCount);
        return updated;
      });


      await axios.post(
        "http://localhost:5000/api/cart/update",
        { productId, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(" Quantity update error:", error);
      alert("Failed to update quantity. Please try again.");
      fetchCart();
    } finally {
      setUpdating((s) => ({ ...s, [productId]: false }));
    }
  };

  
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (updating[productId]) return;
      setUpdating((s) => ({ ...s, [productId]: true }));

      setCart((prev) => {
        const filtered = prev.filter(
          (item) => (item.productId || item.id) !== productId
        );
        const totalCount = filtered.reduce(
          (sum, cartItem) => sum + (cartItem.quantity || 1),
          0
        );
        setCartCount(totalCount);
        return filtered;
      });

      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(" Remove item error:", error);
      alert("Failed to remove item. Please try again.");
      fetchCart();
    } finally {
      setUpdating((s) => ({ ...s, [productId]: false }));
    }
  };

 
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      const productId =
        product.id ||
        `${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Added to cart!");
      fetchCart();
    } catch (err) {
      console.error(" Add to cart error:", err);
      alert(err.response?.data?.error || "Failed to add to cart.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let paused = false;
    let speed = 1;

    const loop = () => {
      if (!paused) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }
      requestAnimationFrame(loop);
    };

    loop();
    container.addEventListener("mouseenter", () => (paused = true));
    container.addEventListener("mouseleave", () => (paused = false));

    return () => {
      container.removeEventListener("mouseenter", () => (paused = true));
      container.removeEventListener("mouseleave", () => (paused = false));
    };
  }, []);
  useEffect(() => {
  
  const cleared = localStorage.getItem("cartCleared");
  if (cleared) {
    setCart([]);
;
    localStorage.setItem("cartCleared", "true");

  }
}, []);


  return (
    <div>
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Shopping Cart
        </h2>

        {/* 🛒 Cart Display */}
        {loading ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            Loading your cart...
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/product")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* 🧾 Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              {cart.map((item) => {
                const pid = item.productId || item.id;
                const isUpdating = !!updating[pid];
                return (
                  <div
                    key={pid}
                    className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-green-600 font-bold">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(pid, "dec")}
                          disabled={isUpdating}
                          className={`w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center transition ${
                            isUpdating ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          −
                        </button>
                        <span className="font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(pid, "inc")}
                          disabled={isUpdating}
                          className={`w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center transition ${
                            isUpdating ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          +
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          ₹{(item.price || 0) * (item.quantity || 0)}
                        </p>
                        <button
                          onClick={() => removeItem(pid)}
                          disabled={isUpdating}
                          className={`text-red-500 hover:text-red-700 text-sm transition ${
                            isUpdating ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 💰 Total + Checkout */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Total: ₹{total}
              </h3>
              <button
                onClick={() => navigate("/order")}
                className="w-full sm:w-auto bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
</div>
        {/* 🌿 Best Selling Plants Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-green-800 text-center mb-8">
            Best Selling Plants
          </h2>

          <div
            ref={scrollRef}
            className="overflow-x-hidden whitespace-nowrap pb-4 cursor-pointer"
          >
            <div className="flex gap-6 w-max px-2">
              {[...bestSelling, ...bestSelling].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden min-w-[250px] sm:min-w-[280px]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {item.name}
                    </h3>
                    <p className="text-green-700 font-bold mt-1 text-base">
                      ₹{item.price}
                      {item.discount && (
                        <span className="text-red-500 text-sm ml-2">
                          ({item.discount}% OFF)
                        </span>
                      )}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.description}
                    </p>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-3 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       
      
    </div>
     <div className="bg-green-800 text-white rounded-t-xl">
          <footer className="py-10 px-6 sm:px-10 md:px-14 lg:px-20">
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
             
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src={green} alt="logo" className="w-28 h-auto" />
                </div>
                <p className="text-sm text-gray-100">
                  Your trusted online plant nursery, bringing nature closer to your home
                  with a wide variety of plants and gardening essentials.
                </p>
              </div>
        
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-100">
                  <li><a href="/About" className="hover:text-yellow-300 transition">About Us</a></li>
                  <li><a href="/Product" className="hover:text-yellow-300 transition">Products</a></li>
                  <li><a href="/guide" className="hover:text-yellow-300 transition">Blog</a></li>
                  <li><a href="/Contact" className="hover:text-yellow-300 transition">Contact</a></li>
                </ul>
              </div>
        
              {/* Policies */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Policies</h3>
                <ul className="space-y-2 text-sm text-gray-100">
                  <li><a href="#" className="hover:text-yellow-300 transition">Return Policy</a></li>
                  <li><a href="#" className="hover:text-yellow-300 transition">Shipping Policy</a></li>
                  <li><a href="#" className="hover:text-yellow-300 transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a></li>
                </ul>
              </div>
        
             
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-gray-100 mb-3">
                  Subscribe to get special offers and plant care tips!
                </p>
        
                
                <form className="flex flex-col md:flex-row gap-3 w-full ">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full sm:w-auto flex-1 px-3  py-2 md:w-18   rounded-md border border-green-600 text-gray-800 
                               focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md transition text-white"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
        
            {/* Divider */}
            <div className="border-t border-green-700 my-8"></div>
        
            {/* Bottom Section */}
            <div className="flex flex-col xl:flex-row justify-between items-center text-sm text-gray-100 space-y-6 xl:space-y-0">
              <p className="text-center xl:text-left">
                © 2025 Green Nursery. All rights reserved.
              </p>
        
              {/* Social Links */}
              <div className="text-center">
                <h3 className="font-semibold mb-3 text-base">Follow Us</h3>
                <div className="flex justify-center xl:justify-end gap-5 text-2xl">
                  <a href="#" className="hover:opacity-80 transition">
                    <img src={fa} className="h-8 w-8" alt="Facebook" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition">
                    <img src={y} className="h-8 w-8" alt="YouTube" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition">
                    <img src={i} className="h-7 w-7" alt="Instagram" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition">
                    <img src={x} className="h-8 w-8" alt="X (Twitter)" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        
      </div>
  );
}

export default CartPage;
