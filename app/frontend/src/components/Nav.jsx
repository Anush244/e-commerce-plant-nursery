import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";  

import Green from "../assets/green.png";
import Se from "../assets/se.png";
import lo from "../assets/lo.png";
import ca from "../assets/ca.png";
import me from "../assets/me.png";
import drop from "../assets/dow.png";

import product1 from "../product1.json";
import product2 from "../outdoor.json";
import product3 from "../medicin.json";
import product4 from "../flower.json";
import product5 from "../pot.json";
import product6 from "../bulb.json";
import product7 from "../fertili.json";
import product8 from "../garden.json";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { cartCount, setCartCount } = useCart();

  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  const allProducts = [
    ...product1,
    ...product2,
    ...product3,
    ...product4,
    ...product5,
    ...product6,
    ...product7,
    ...product8,
  ];

  // 🔍 Search handling
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (!value.trim()) return setFiltered([]);
    const results = allProducts.filter((p) =>
      p.name.toLowerCase().includes(value)
    );
    setFiltered(results.slice(0, 6));
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    const found = allProducts.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );
    if (found) {
      navigate(`/product/${encodeURIComponent(found.name)}`, {
        state: { product: found },
      });
    } else {
      navigate("/product", { state: { searchQuery: query } });
    }
    setFiltered([]);
    setQuery("");
  };

  const goToProduct = (product) => {
    navigate(`/product/${encodeURIComponent(product.name)}`, {
      state: { product },
    });
    setQuery("");
    setFiltered([]);
  };

  // 🛒 Fetch cart count
  const updateCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalLocal = localCart.reduce(
        (sum, i) => sum + (i.quantity || 1),
        0
      );
      setCartCount(totalLocal);
      setIsLogged(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const total = Array.isArray(res.data)
        ? res.data.reduce((sum, i) => sum + (i.quantity || 1), 0)
        : 0;
      setCartCount(total);
      setIsLogged(true);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // 🧩 Effects
  useEffect(() => {
    updateCartCount();
  }, []);

  // 🔹 Auto-close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setDropdown(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Auto-close dropdown when searching
  useEffect(() => {
    if (query.trim().length > 0) {
      setDropdown(false);
    }
  }, [query]);

  // 🔹 Auto-close dropdown when route changes
  useEffect(() => {
    setDropdown(false);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* 🔹 Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
        <Link to="/contact" className="hover:text-green-600">
          📞 Expert Support 24/7
        </Link>
        <div className="flex space-x-4">
          <Link to="/help" className="hover:text-green-600">
            Help
          </Link>
          <Link to="/cart" className="hover:text-green-600">
            My Orders
          </Link>
          <Link to="/offers" className="hover:text-green-600">
            Offers
          </Link>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/">
          <img src={Green} alt="GreenGrow" className="w-36" />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6 relative">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            placeholder="Search plants, pots, fertilizers..."
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            onClick={handleSearchSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md"
          >
            <img src={Se} alt="search" className="w-6 h-6" />
          </button>

          {/* Search Results Dropdown */}
          {filtered.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-md z-50 max-h-72 overflow-y-auto">
              {filtered.map((p, i) => (
                <div
                  key={i}
                  onClick={() => goToProduct(p)}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-green-50"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-gray-700">{p.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700">
          {isLogged ? (
            <button onClick={handleLogout}>
              <img src={lo} alt="logout" className="w-8 h-8" />
            </button>
          ) : (
            <Link to="/login">
              <img src={lo} alt="login" className="w-8 h-8" />
            </Link>
          )}

          <Link to="/cart" className="relative">
            <img src={ca} alt="cart" className="w-8 h-8" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden hover:text-green-600"
          >
            {isOpen ? "✖" : <img src={me} alt="menu" className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex justify-center space-x-8 py-3 bg-green-50 text-green-700 font-medium">
        <Link to="/">Home</Link>

        {/* Dropdown */}
        <div className="relative dropdown-menu">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="dropdown-toggle hover:text-green-700 flex items-center space-x-1 focus:outline-none font-semibold"
          >
            <span>Products</span>
            <img src={drop} alt="dropdown" className="h-4 pt-1" />
          </button>

          {dropdown && (
            <div className="fixed left-0 top-[130px] w-full bg-white border-t border-green-100 shadow-lg z-50 mt-4">
              <div className="flex justify-center flex-wrap gap-x-8 px-8 py-4 text-green-800 font-medium whitespace-nowrap">
                {[
                  "Indoor Plants",
                  "Outdoor Plants",
                  "Medicinal Plants",
                  "Flowering Plants",
                  "Pot Plants",
                  "Bulbs & Seeds",
                  "Fertilizers",
                  "Gardening Kit",
                  "Planters",
                ].map((cat, i) => (
                  <Link
                    key={i}
                    to="/product"
                    state={{ category: cat }}
                    className="px-4 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/guide">Plant Guide</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Check Out</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/feedback">Feedback</Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-50 shadow-inner px-4 py-4">
          <div className="grid grid-cols-2 gap-3 text-green-700 font-medium text-center">
            <Link to="/" className="hover:text-green-800">
              Home
            </Link>

            {/* Mobile Dropdown */}
            <button
              onClick={() => setDropdown(!dropdown)}
              className="hover:text-green-700 flex items-center justify-center font-semibold"
            >
              Products
            </button>

            {dropdown && (
              <div className="mt-3 bg-white rounded-lg shadow-md border border-green-100 py-2">
                {[
                  "Indoor Plants",
                  "Outdoor Plants",
                  "Medicinal Plants",
                  "Flowering Plants",
                  "Pot Plants",
                  "Bulbs & Seeds",
                  "Fertilizers",
                  "Gardening Kit",
                  "Planters",
                ].map((cat, i) => (
                  <Link
                    key={i}
                    to="/product"
                    state={{ category: cat }}
                    className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/guide" className="hover:text-green-800">
              Plant Guide
            </Link>
            <Link to="/about" className="hover:text-green-800">
              About
            </Link>
            <Link to="/cart" className="hover:text-green-800">
              Check Out
            </Link>
            <Link to="/contact" className="hover:text-green-800">
              Contact
            </Link>
            <Link to="/feedback" className="hover:text-green-800">
              Feedback
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
