

import React from 'react'
import pr1 from '../assets/pr1.jpg'
import pr2 from '../assets/pr2.jpg'
import pr3 from '../assets/pr3.jpg'
import pr4 from '../assets/pr4.jpg'
import pl from '../assets/pl.jpg'
import abo from "../assets/about.png"
import g1 from "../assets/g1.jpg"
import a6 from "../assets/a6.jpg"
function About() {
  



  const team = [
    {
      name: "Ajeesh Kumar",
      role: "Founder & Plant Enthusiast",
      img: pr1,
      bio: "Ajeesh started Green Nursery with a simple dream — to make every home in Kanyakumari greener and happier. His passion for nature drives everything we do.",
    },
    {
      name: "Meena Joseph",
      role: "Head Gardener",
      img: pr2,
      bio: "Meena has over 10 years of gardening experience. From nurturing seedlings to arranging flower beds, she ensures every plant gets the love it deserves.",
    },
    {
      name: "Ravi Das",
      role: "Logistics & Delivery Lead",
      img: pr3,
      bio: "Ravi manages all plant deliveries across Nagercoil and nearby areas. His careful handling ensures your greens reach safely, fresh, and ready to grow.",
    },
    {
      name: "Anitha Raj",
      role: "Customer Care & Store Manager",
      img: pr4,
      bio: "Anitha is the friendly face at our nursery. Whether it’s plant care advice or bulk order help, she’s always happy to assist our visitors and customers.",
    },
  ];

  return (
    <div>
   <div
  className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[420px] xl:h-[500px] 
             bg-cover bg-center flex items-center justify-center text-center"
  style={{
    backgroundImage: `url(${abo})`,
  }}
>

  {/* Soft dull gradient for blending */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent"></div>

  {/* Light blur that makes text blend with background */}
  <div className="absolute inset-0 backdrop-blur-[1.5px]"></div>

  {/* Text Block */}
  <div className="relative z-10 text-center px-6 md:px-12">

    <h2 className="text-3xl md:text-5xl font-extrabold 
                   text-[#E6E6E6] opacity-90 
                   drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)] mb-4">
      Bring Nature Home, Live Green Every Day
    </h2>

    <p className="text-base md:text-lg 
                  text-[#D7EED7] opacity-80
                  max-w-2xl mx-auto leading-relaxed 
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
      Discover the joy of nurturing life — from cozy indoor plants to vibrant outdoor gardens.
      Let’s grow together and make your space bloom with positivity and freshness.
    </p>

  </div>
</div>

cd
 <div className="bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-4">
          About Green Nursery 
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700">
          Bringing nature closer to homes across
          <strong>Nagercoil</strong> and <strong>Kanyakumari</strong> — one plant at a time.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <img
            src= {g1}
            alt="Green Nursery"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-700 mb-4">
            Growing Greener Dreams Since 2018
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            Welcome to <strong>Green Nursery</strong> — your trusted plant and gardening partner in
            <strong>Nagercoil, Kanyakumari</strong>. What began as a small family passion for
            nature has flourished into a local destination for plant lovers and nature enthusiasts.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We believe that plants don’t just decorate spaces — they heal, inspire, and bring
            happiness. Our mission is to make gardening easy, sustainable, and joyful for everyone.
          </p>
        </div>
      </section>


      <section className="bg-white shadow-lg py-12 px-4 sm:px-6 lg:px-12 rounded-2xl max-w-7xl mx-auto my-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-700 text-center mb-8">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          {[
            { title: " Indoor & Outdoor Plants", desc: "Beautiful, air-purifying, and flowering plants." },
            { title: "Pots & Planters", desc: "Eco-friendly clay, ceramic, and designer pots." },
            { title: " Seeds & Garden Tools", desc: "High-quality seeds and organic fertilizers." },
            { title: " Expert Guidance", desc: "Free plant care advice and seasonal workshops." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-green-50 rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-green-700 mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-700 mb-4">
          Our Mission
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
          To inspire every household in <strong>Kanyakumari</strong> to grow something green.  
          We aim to connect people back to nature and promote sustainable, eco-friendly living
          through the joy of gardening.
        </p>
      </section>

    
      <section className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 text-center mb-12">
          Meet Our Team 
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 sm:w-32 h-28 sm:h-32 object-cover rounded-full border-4 border-green-500 mb-4"
              />
              <h3 className="text-base sm:text-lg font-semibold text-green-700">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-xs sm:text-sm text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-700 text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          Visit Us in Nagercoil 
        </h2>
        <p className="text-sm sm:text-base mb-3">
           No. 25, Flower Street, Near Main Market, Nagercoil, Tamil Nadu – 629001
        </p>
        <p className="text-sm sm:text-base mb-1">📞 +91 98765 43210</p>
        <p className="text-sm sm:text-base mb-6">
           Mon–Sat: 9:00 AM – 6:30 PM | Sun: 9:00 AM – 1:00 PM
        </p>
        <a
          href="https://www.google.com/maps?q=13.0827,80.2707"
          target="_blank"
          rel="noreferrer"
          className="bg-yellow-400 text-green-800 font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition text-sm sm:text-base"
        >
           View on Google Maps
        </a>
      </section>

   
      <footer className="bg-green-800 text-gray-100 py-6 text-center text-xs sm:text-sm">
        <ul>
          <li ><a href=''>Home</a></li>
          <li>Product</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <p>© 2025 Green Nursery, Nagercoil. All Rights Reserved.</p>
        <p className="text-yellow-300 mt-2">
          Every purchase you make helps us plant more trees 
        </p>

      </footer>
    </div>
    <div></div></div>

  );
};

export default About;
