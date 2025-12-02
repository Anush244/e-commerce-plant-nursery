import React from "react";
import i from '../assets/i.png';
import fa from '../assets/fa.png';
import y from '../assets/y.png';
import x from '../assets/x.png';
import wa from "../assets/wa.gif"
const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 text-gray-800 relative">
     
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Let’s Grow Together </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Have questions about your plants, bulk orders, or deliveries?  
          We’d love to hear from you — our garden experts are just a message away.
        </p>
      </section>

    
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Reach Out to Us</h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="text"
              placeholder="Your Phone (optional)"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <select className="border border-gray-300 text-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none">
              <option>Subject</option>
              <option>Order Support</option>
              <option>Plant Care Help</option>
              <option>Bulk Purchase</option>
              <option>Other</option>
            </select>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            ></textarea>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all"
            >
              Send Message
            </button>
            <p className="text-sm text-gray-600 mt-2"> We usually reply within 24 hours.</p>
          </form>
        </div>

 
        <div className="flex flex-col justify-center bg-green-700 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
          <p className="mb-2"> 123 Nagercoil, Kanyakumari, Tamil Nadu, India</p>
          <p className="mb-2">📞 +91 98765 43210</p>
          <p className="mb-2"> support@greennursery.in</p>
          <p className="mb-4">Mon–Sat: 9:00 AM – 6:00 PM</p>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="bg-yellow-400 text-green-800 font-semibold px-4 py-2 rounded-md w-max hover:bg-yellow-300 transition"
          >
            <img src={wa} alt="WhatsApp" className="inline-block w-6 h-6 mr-2 align-middle" />
             Chat on WhatsApp
          </a>

          <div className="mt-8">
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-5 text-2xl">
              <a href="#" className="hover:text-yellow-300">
                <img src={fa} ></img>
              </a>
              <a href="#" className="hover:text-yellow-300">
                <img src={y} ></img>
              </a>
              <a href="#" className="hover:text-yellow-300">
                <img src={i} ></img>
              </a>
              <a href="#" className="hover:text-yellow-300">
                <img src={x} ></img>
              </a>
            </div>
          </div>
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Visit Our Nursery</h2>
        <p className="text-center text-gray-600 mb-6">
          Come see our collection of indoor & outdoor plants, pots, and seeds.
        </p>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          
          <iframe  title="Green Nursery Location" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1446.5318017684954!2d77.39607271490686!3d8.146431064200272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1761284675568!5m2!1sen!2sin" width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"></iframe>
        </div>
      </section>

     
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        title="Chat on WhatsApp"
      >
        <img src={wa} alt="WhatsApp" className="w-8 h-8" />
      </a>

      <footer className="bg-green-800 text-gray-100 py-6 text-center text-sm mt-12">
        <p>© 2025 Green Nursery. All Rights Reserved.</p>
        <p className="text-yellow-300 mt-2">
          Every purchase you make helps us plant more trees 🌳
        </p>
      </footer>
    </div>
  );
};

export default Contact;
