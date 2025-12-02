import React, { useState } from "react";
import { plantGuides } from "../guide"; 
import g from "../assets/g.jpg";
import green from "../assets/green.png";
const PlantGuide = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", question: "" });

  const cultivationSteps = [
    "Choose the right plant species for your region and climate.",
  "Research the plant’s sunlight, water, and soil requirements.",
  "Select a suitable location (good sunlight, drainage, and protection).",
  "Test soil pH and nutrient levels using a soil testing kit.",
  "Amend the soil with compost or organic matter if necessary.",
  "Remove weeds, stones, and debris from the planting area.",
  "Plan your garden layout or pot arrangement for spacing.",
  "Gather essential tools (trowel, watering can, gloves, etc.).",
  "Prepare seed trays, pots, or beds depending on plant type.",
  "Choose between seeds, cuttings, or saplings as planting material.",
  "Loosen the soil to improve aeration and root growth.",
  "Mix in organic compost, manure, or vermicompost evenly.",
  "Ensure proper drainage to prevent waterlogging.",
  "Add natural fertilizers like bone meal or neem cake if needed.",
  "Level the soil surface for uniform planting depth.",
  "Read packet instructions for seed depth and spacing.",
  "Sow seeds at correct depth — usually 2–3 times their diameter.",
  "For cuttings, dip ends in rooting hormone before planting.",
  "Transplant seedlings gently without damaging roots.",
  "Maintain proper spacing between plants to allow air flow.",
  "Cover seeds lightly with soil and press gently.",
  "Water immediately after planting to settle the soil.",
  "Label each plant or section for easy identification.",
  "Water early morning or late evening to reduce evaporation.",
  "Keep soil consistently moist but not soggy.",
  "Use a spray bottle for delicate seedlings.",
  "Check moisture by inserting a finger into the soil.",
  "Mulch with straw or dry leaves to retain moisture.",
  "Avoid overwatering to prevent root rot.",
  "Ensure proper drainage holes in pots.",
  "Provide adequate sunlight — most plants need 4–6 hours daily.",
  "Move pots indoors or to shade during extreme heat.",
  "Protect young plants from frost or heavy rain.",
  "Use grow lights for indoor or shaded cultivation.",
  "Apply organic fertilizer or compost every 2–4 weeks.",
  "Use liquid manure (like cow dung slurry) for quick nutrition.",
  "Prune dead or yellow leaves to promote healthy growth.",
  "Support tall plants with stakes or trellises.",
  "Rotate crops seasonally to maintain soil fertility.",
  "Add Epsom salt or banana peel fertilizer for extra minerals.",
  "Inspect plants regularly for pests or disease symptoms.",
  "Use neem oil spray or organic pesticides weekly.",
  "Remove infected leaves to stop disease spread.",
  "Encourage beneficial insects like ladybugs and bees.",
  "Maintain balanced watering during flowering.",
  "Add potassium-rich fertilizer for fruit-bearing plants.",
  "Hand-pollinate flowers if natural pollinators are scarce.",
  "Trim unwanted branches to improve yield.",
  "Harvest fruits, flowers, or leaves at the right maturity stage.",
  "After harvest, prune plants and enrich soil for the next cycle."
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    
    alert("Thank you! Our experts will respond soon.");
    setForm({ name: "", email: "", question: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div
        className="h-[100px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${g})` }}
      ></div>

      <div className="text-center  px-4 text-green-800 font-bold md:pt-6">
        <h1 className="text-4xl md:text-5xl px-6 py-2">Plant Guidance</h1>
        <p className="mt-4 text-lg bg-green-900/50 px-4 py-2 rounded-md text-white text-center">
          Learn how to grow healthy, happy plants — from soil to sunlight.
        </p>
      </div>


      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plantGuides.map((topic, index) => (
          <div
            key={index}
            className="bg-white border-t-4 border-green-500 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setSelectedTopic(topic)}
          >
            <img
              src={topic.img}
              alt={topic.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 text-center">{topic.title}</h3>
            <p className="text-gray-600 text-center mt-2">{topic.summary}</p>
            <button
              onClick={() => setSelectedTopic(topic)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              More Details
            </button>
          </div>
        ))}
      </section>

      {selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 px-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative max-h-[80vh] overflow-y-auto transform transition-transform duration-300 scale-100">
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            {selectedTopic.img && (
              <div className="mb-4 text-center">
                <img
                  src={selectedTopic.img}
                  alt={selectedTopic.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="mt-4 text-center font-semibold">
              <h2 className="text-2xl font-bold text-green-700 mb-4">{selectedTopic.title}</h2>
              <div className="overflow-y-auto max-h-[60vh] text-left px-2 sm:px-6">
                <p className="text-gray-700 whitespace-pre-line">{selectedTopic.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 bg-green-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-8">
         Steps to Cultivate Plants
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cultivationSteps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 border border-green-100 hover:shadow-md transition-all duration-200"
          >
            <h2 className="text-green-700 font-semibold mb-2">
              Step {index + 1}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </div>


      <section className="bg-gray-50 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Ask Our Plant Experts</h2>
          <p className="text-gray-700 mb-6">
            Got a question about your plants? Ask below, and our experts will help you grow better!
          </p>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              name="question"
              placeholder="Your Question..."
              rows="4"
              value={form.question}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200">
              Ask Now
            </button>
          </form>
        </div>
      </section>
      <div className='bg-green-800 text-center p-4 h-auto rounded-t-xl'>
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
                    <li><a href="#" className="hover:text-yellow-300 transition">About Us</a></li>
                    <li><a href="#" className="hover:text-yellow-300 transition">Products</a></li>
                    <li><a href="#" className="hover:text-yellow-300 transition">Blog</a></li>
                    <li><a href="#" className="hover:text-yellow-300 transition">Contact</a></li>
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
                  <a href="#" className="hover:text-yellow-300"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="hover:text-yellow-300"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="hover:text-yellow-300"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="hover:text-yellow-300"><i className="fab fa-youtube"></i></a>
      </div>
              </div>
            </footer>
            </div>
    </div>
  );
};

export default PlantGuide;
