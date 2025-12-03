import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductModal from "./productmodel";

import y from '../assets/y.png';
import i from '../assets/i.png';
import x from '../assets/x.png';
import fa from '../assets/fa.png';
import product1 from "../product1.json";
import product2 from "../outdoor.json";
import product3 from "../medicin.json";
import product4 from "../flower.json";
import product5 from "../pot.json";
import product6 from "../bulb.json";
import product7 from "../fertili.json";
import product8 from "../garden.json";
import product9 from "../product.json";

import green from "../assets/green.png";
import a1 from "../assets/a1.jpg";
// import a2 from "../assets/a2.jpg";
// import a3 from "../assets/a3.jpg";
// import a4 from "../assets/a4.jpg";
// import a5 from "../assets/a5.jpg";
// import a6 from "../assets/a6.jpg";
// import a7 from "../assets/a7.jpg";
// import a8 from "../assets/a8.jpg";
// import a9 from "../assets/a9.jpg";
// import a10 from "../assets/a10.jpg";
import { useNavigate } from "react-router-dom";



const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read category from Nav dropdown or default to "All"
  const selectedCategory = location.state?.category || "All";
  const [filter, setFilter] = useState(selectedCategory);

  // Pagination and modal states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Feedback states
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackMap, setFeedbackMap] = useState({});

  const productsPerPage = 9;

  // Optional: handle search query (?q=something)
  const searchQuery =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
  const [showAll, setShowAll] = useState(false);

  // Product data sources
  const productMap = {
    "Indoor Plants": product1,
    "Outdoor Plants": product2,
    "Medicinal Plants": product3,
    "Flowering Plants": product4,
    "Pot Plants": product5,
    "Bulbs & Seeds": product6,
    "Fertilizers": product7,
    "Gardening Kit": product8,
    "Planters": product9,
  };

  // Update filter if category comes from Nav
  useEffect(() => {
    if (location.state?.category) {
      setFilter(location.state.category);
    }
  }, [location.state]);


  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("/api/feedback");
        setFeedbackList(res.data);

        const map = {};
        res.data.forEach((f) => {
          if (!map[f.category]) map[f.category] = { total: 0, count: 0 };
          map[f.category].total += f.rating;
          map[f.category].count += 1;
        });

        const finalMap = {};
        for (const key in map) {
          finalMap[key] = {
            avgRating: map[key].total / map[key].count,
            count: map[key].count,
          };
        }
        setFeedbackMap(finalMap);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedback();
  }, []);


  const allProducts = [
    ...product1,
    ...product2,
    ...product3,
    ...product4,
    ...product5,
    ...product6,
    ...product7,
    ...product8,
    ...product9,
  ];

  const uniqueProducts = [
    ...new Map(allProducts.map((p) => [p.name, p])).values(),
  ];


  let filteredProducts =
    filter === "All"
      ? uniqueProducts
      : productMap[filter]
        ? [...new Map(productMap[filter].map((p) => [p.name, p])).values()]
        : [];


  const searchedProducts =
    filter === "All" && searchQuery
      ? uniqueProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      )
      : [];

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const productId =
        product.id ||
        `${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;

      const res = await axios.post(
        "/api/cart/add",
        {
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.response?.data?.error || "Failed to add to cart");
    }
  };


  useEffect(() => {
    const scrollContainer = document.getElementById("best-seller-scroll");
    if (!scrollContainer) return;

    let direction = 1;
    const interval = setInterval(() => {
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      scrollContainer.scrollBy({
        left: 300 * direction,
        behavior: "smooth",
      });

      if (scrollContainer.scrollLeft + 320 >= maxScroll) direction = -1;
      if (scrollContainer.scrollLeft <= 0) direction = 1;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const bestSellingProducts = uniqueProducts.slice(0, 15);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}


      <section className="w-full px-2 sm:px-4 py-4">
        <img
          src={a1}
          alt="Banner"
          className="rounded-2xl w-full h-48 sm:h-64 md:h-72 lg:h-100 xl:h-110 object-cover"
        />
      </section>


      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-3 sm:px-6 py-6">

        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Categories
          </h2>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {["All", ...Object.keys(productMap)].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentPage(1);
                }}
                className={`w-full py-2 px-3 rounded text-sm sm:text-base ${filter === cat
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>


        <div className="flex-1 flex flex-col gap-10">

          {/* {filter === "All" && searchQuery && (
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">
                Search Results for “{searchQuery}”
              </h2>
              {searchedProducts.length === 0 ? (
                <p className="text-gray-600 text-center">
                  No matching products found.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {searchedProducts.map((p) => (
                    <div
                      key={p.name}
                      className="bg-white p-3 sm:p-4 rounded-xl shadow hover:shadow-lg transition-all flex flex-col"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-40 sm:h-48 md:h-52 object-contain mb-2 cursor-pointer"
                       onClick={() =>
  navigate(`/product/${encodeURIComponent(p.name)}`, { state: { product: p } })
}

                      />
                      <h3 className="font-semibold text-sm sm:text-base">
                        {p.name}
                      </h3>
                      <p className="text-green-700 font-bold mt-1 text-sm sm:text-base">
                        ₹{p.price}
                      </p>
                      <button
                        onClick={() => addToCart(p)}
                        className="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm sm:text-base"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

         */}
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentProducts.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">
                No products found for “{searchQuery || filter}”.
              </p>
            ) :
              (
                currentProducts.map((p) => {
                  const feedback =
                    feedbackMap[p.name] || { avgRating: 0, count: 0 };
                  return (
                    <div
                      key={p.name}
                      className="bg-white p-3 sm:p-4 rounded-xl shadow hover:shadow-lg transition-all flex flex-col"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-40 sm:h-48 md:h-52 object-contain mb-2 cursor-pointer"
                        onClick={() => setSelectedProduct(p)}
                      />
                      <h3 className="font-semibold text-sm sm:text-base">
                        {p.name}
                      </h3>
                      <p className="text-green-700 font-bold mt-1 text-sm sm:text-base">
                        ₹{p.price}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-yellow-400 text-xs sm:text-sm">
                        {"★".repeat(Math.round(feedback.avgRating)) || "☆☆☆☆☆"}
                        <span className="text-gray-600 ml-1">
                          ({feedback.count})
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        className="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm sm:text-base"
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })
              )}
          </main>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up on click
              }}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-medium transition ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up on click
              }}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-medium transition ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            >
              Next
            </button>
          </div>

        </div>
      </div>


      <section className="mt-12 sm:mt-16 px-2 sm:px-6">
        <h2 className="text-center text-green-800 font-bold mb-6 text-2xl sm:text-3xl lg:text-4xl">
          Best Selling Products
        </h2>
        <div className="relative">
          <div
            id="best-seller-scroll"
            className="flex gap-4 sm:gap-6 overflow-hidden px-4 py-3 whitespace-nowrap"
          >

            {bestSellingProducts.map((p) => (
              <div
                key={p.name}
                className="flex-[0_0_75%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_23%] xl:flex-[0_0_18%] bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedProduct(p)}
              >
                <div className="relative w-full h-40 sm:h-48 bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 flex flex-col">
                  <h3 className="text-sm sm:text-base font-semibold truncate">
                    {p.name}
                  </h3>
                  <p className="text-green-700 font-bold mt-1 text-base">
                    ₹{p.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="mt-3 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <div className="mt-16 px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8">
          What Our Customers Say
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <div className="mb-6 sm:mb-0">
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-yellow-400 text-3xl mr-2">★</span>
                <span className="text-yellow-400 text-3xl mr-2">★</span>
                <span className="text-yellow-400 text-3xl mr-2">★</span>
                <span className="text-yellow-400 text-3xl mr-2">★</span>
                <span className="text-gray-300 text-3xl">★</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-2">
                4.1 out of 5
              </h3>
              <p className="text-gray-500 text-sm">
                Based on {feedbackList.length} reviews
              </p>
            </div>

            <div className="w-full sm:w-1/2 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = feedbackList.filter(
                  (f) => parseInt(f.rating) === star
                ).length;
                const percent = feedbackList.length
                  ? (count / feedbackList.length) * 100
                  : 0;
                return (
                  <div key={star} className="flex items-center text-sm">
                    <span className="w-10 text-gray-700">{star}★</span>
                    <div className="w-full bg-gray-200 rounded-full h-3 mx-2">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-around mt-6 gap-4 text-sm">
            <div className="text-center">
              <p className="text-green-700 font-bold text-lg">15</p>
              <p className="text-gray-600">Verified Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-green-700 font-bold text-lg">Top 1%</p>
              <p className="text-gray-600">Trusted Stores</p>
            </div>
            <div className="text-center">
              <p className="text-green-700 font-bold text-lg">Silver</p>
              <p className="text-gray-600">Transparency</p>
            </div>
            <div className="text-center">
              <p className="text-green-700 font-bold text-lg">182+</p>
              <p className="text-gray-600">Monthly Verified Reviews</p>
            </div>
          </div>
        </div>

        {feedbackList.length === 0 ? (
          <p className="text-center text-gray-500">
            No feedback yet. Be the first to share!
          </p>
        ) : (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAll ? feedbackList : feedbackList.slice(0, 6)).map((fb, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-green-800">{fb.name}</h3>
                    <span className="text-yellow-400 text-sm">
                      {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{fb.message}</p>
                  {fb.email && (
                    <p className="text-xs text-gray-400 mt-2 italic">
                      ({fb.email})
                    </p>
                  )}
                  <p className="text-right text-xs text-gray-400 mt-2">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {feedbackList.length > 6 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        )}


      </div><div className='bg-green-800 text-center p-4 h-auto rounded-t-xl mt-2'>
        <footer className="bg-green-800 text-white py-10 px-6 md:px-12 lg:px-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={green}
                  alt="logo"
                  className="w-30 h-8"
                />

              </div>
              <p className="text-sm text-gray-100 ">
                Your trusted online plant nursery, bringing nature closer to your home with a wide
                variety of plants and gardening essentials.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-100 text-sm">
                <li><a href="/About" className="hover:text-yellow-300 transition">About Us</a></li>
                <li><a href="/Product" className="hover:text-yellow-300 transition">Products</a></li>
                <li><a href="/guide" className="hover:text-yellow-300 transition">Blog</a></li>
                <li><a href="/Contact" className="hover:text-yellow-300 transition">Contact</a></li>
              </ul>
            </div>


            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-gray-100 text-sm">
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


          <div className="border-t border-green-600 my-8"></div>


          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-100 space-y-3 sm:space-y-0">
            <p>© 2025 Green Nursery. All rights reserved.</p>
            <div className="flex space-x-4 text-xl">
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-5 text-2xl">
                  <a href="#" className="">
                    <img src={fa} className='h-8' ></img>
                  </a>
                  <a href="#" className="">
                    <img src={y} className='h-8' ></img>
                  </a>
                  <a href="#" className="">
                    <img src={i} className='h-7' ></img>
                  </a>
                  <a href="#" className="">
                    <img src={x} className='h-8' ></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>




  );
};

export default ProductPage;