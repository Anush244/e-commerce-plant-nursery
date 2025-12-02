import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bg1 from '../assets/bg1.jpg';
import Bg2 from '../assets/bg2.jpg';
import Bg3 from '../assets/bg3.webp';
import Bg4 from '../assets/bg4.jpg';
import Indoor from '../assets/indoor.webp';
import Outdoor from '../assets/outoor.jpeg';
import Medicin from '../assets/medicin.jpg';
import flower from '../assets/flower.jpg';
import pot from '../assets/pot.jpg';
import tools from '../assets/tools.jpg';
import y from '../assets/y.png';
import i from '../assets/i.png';
import x from '../assets/x.png';
import fa from '../assets/fa.png';
import c1 from '../assets/c1.webp';
import c2 from '../assets/c2.webp';
import c3 from '../assets/c3.webp';
import green from '../assets/green.png';
import lov2 from '../assets/lov(2).png';
import lov1 from '../assets/lov(1).png';
import lov3 from '../assets/lov(3).png';
import Aos from 'aos';
import 'aos/dist/aos.css';
function Home() {
  useEffect(()=>{
    Aos.init({duration:3000});
  },[]);
  const slides = [
    {
      image: Bg1,
      heading: "Welcome to Green Nursery",
      subheading: "Bringing Nature Closer to You",
    },
    {
      image: Bg2,
      heading: "Nurture Your Space",
      subheading: "Small Plants, Big Impact",
    },
    {
      image: Bg3,
      heading: "Grow with Love",
      subheading: "Eco-Friendly, Locally Grown Greens",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      <div className="relative w-full overflow-hidden bg-cover bg-center h-[270px] sm:h-[350px] md:h-[500px] lg:h-[600px] xl:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="pt-20 sm:pt-24 md:pt-30 lg:pt-40 xl:pt-44">
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                <div className="space-y-4">
                  <h1 className="text-white font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold shadow">
                    {slide.heading}
                    <br />
                    <span className="text-xl sm:text-3xl md:text-4xl block mt-2">
                      {slide.subheading}
                    </span>
                  </h1>
                  <Link
                    to="/product" 
                    className="mt-0 md:mt-6 lg:mt-8 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md text-xs sm:text-sm md:text-base lg:text-lg "
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div
        // className="w-full h-auto bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: `url(${Bg4})` }}
        
      >

        <div className="py-10 bg-opacity-90" >
        
          <div className="flex flex-col items-center mb-6 text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold italic text-green-800 pb-4">
              Shop by Category
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl">
              Discover our curated collection of plants and accessories for every space
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10" 
     >
           
            <div className="bg-white border  border-green-200 shadow-lg rounded-md text-center p-4 hover:scale-105 transition-transform duration-300 
              w-44 sm:w-52 md:w-64 xl:w-80 
              min-h-[350px] sm:min-h-[400px] md:min-h-[420px] xl:min-h-[450px] mx-auto lg:mt-10" data-aos="fade-up"
            >
              <img
                src={Indoor}
                alt="Indoor Plants"
                className="h-40 sm:h-44 md:h-48 xl:h-52 w-full object-cover mb-4 transition-transform duration-300 hover:scale-90"
              />
              <p className="font-semibold text-base sm:text-lg md:text-xl text-green-700">INDOOR PLANTS</p>
              <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-600">
                Indoor plants purify air, reduce stress, boost humidity, and enhance spaces with easy, low-maintenance care.
              </p>
               <Link
                to="/product" state={{ category: "Indoor Plants" }}
                className="mt-4 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </div>

         
            <div className="bg-white border border-green-200 shadow-lg rounded-md text-center p-4 hover:scale-105 transition-transform duration-300 
              w-44 sm:w-52 md:w-64 xl:w-80 
              min-h-[350px] sm:min-h-[400px] md:min-h-[420px] xl:min-h-[450px] mx-auto lg:mt-10" data-aos="fade-up"
            >
              <img
                src={Outdoor}
                alt="Outdoor Plants"
                className="h-40 sm:h-44 md:h-48 xl:h-52 w-full object-cover mb-4 transition-transform duration-300 hover:scale-90"
              />
              <p className="font-semibold text-base sm:text-lg md:text-xl text-green-700">OUTDOOR PLANTS</p>
              <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-600">
                Outdoor plants enhance curb appeal, support local ecosystems, and provide shade and privacy.
              </p>
               <Link
                to="/product" state={{ category: "Outdoor Plants" }}
                className="mt-4 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </div>

            <div className="bg-white border border-green-200 shadow-lg rounded-md text-center p-4 hover:scale-105 transition-transform duration-300 
              w-44 sm:w-52 md:w-64 xl:w-80 
              min-h-[350px] sm:min-h-[400px] md:min-h-[420px] xl:min-h-[450px] mx-auto lg:mt-10" data-aos="fade-up"
            >
              <img
                src={Medicin}
                alt="Medicinal Plants"
                className="h-40 sm:h-44 md:h-48 xl:h-52 w-full object-cover mb-4 transition-transform duration-300 hover:scale-90"
              />
              <p className="font-semibold text-base sm:text-lg md:text-xl text-green-700">MEDICINAL PLANTS</p>
              <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-600">
                Medicinal plants have been used for centuries to treat various ailments and promote overall health.
              </p>
              <Link
                to="/product" state={{ category: "Medicinal Plants" }}
                className="mt-4 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </div>
            
            <div className="bg-white border border-green-200 shadow-lg rounded-md text-center p-4 hover:scale-105 transition-transform duration-300 
              w-44 sm:w-52 md:w-64 xl:w-80 
              min-h-[350px] sm:min-h-[400px] md:min-h-[420px] xl:min-h-[450px] mx-auto lg:mt-10 lg:mb-20 " data-aos="fade-up"
            >
              <img
                src={flower} 
                alt="Outdoor Plants"
                className="h-40 sm:h-44 md:h-48 xl:h-52 w-full object-cover mb-4 transition-transform duration-300 hover:scale-90"
              />
              <p className="font-semibold text-base sm:text-lg md:text-xl text-green-700">FLOWERING PLANTS</p>
              <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-600">
                flower plants enhance curb appeal, support local ecosystems, and provide shade and privacy.</p>
                 <Link
                to="/product" state={{ category: "Flowering Plants" }}
                className="mt-4 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </div>
            
            <div className="bg-white border border-green-200 shadow-lg rounded-md text-center p-4 hover:scale-105 transition-transform duration-300 
              w-44 sm:w-52 md:w-64 xl:w-80 
              min-h-[350px] sm:min-h-[400px] md:min-h-[420px] xl:min-h-[450px] mx-auto lg:mt-10 lg:mb-20 " data-aos="fade-up"
            >
              <img
                src={pot}
                alt="Outdoor Plants"
                className="h-40 sm:h-44 md:h-48 xl:h-52 w-full object-cover mb-4 transition-transform duration-300 hover:scale-90"
              />
              <p className="font-semibold text-base sm:text-lg md:text-xl text-green-700">POTTING MATERIALS</p>
              <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-600">
                Potting materials enhance curb appeal, support local ecosystems, and provide shade and privacy.
              </p>
               <Link
                to="/product" state={{ category: "Pot Plants" }}
                className="mt-4 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </div>
            
            <div className="bg-white border border-green-200 shadow-lg rounded-md text-center p-4 hover:scale-105 transition-transform duration-300 
              w-44 sm:w-52 md:w-64 xl:w-80 
              min-h-[350px] sm:min-h-[400px] md:min-h-[420px] xl:min-h-[450px] mx-auto lg:mt-10 lg:mb-20 " data-aos="fade-up"
            >
              <img
                src={tools}
                alt="Outdoor Plants" 
                className="h-40 sm:h-44 md:h-48 xl:h-52 w-full object-cover mb-4 transition-transform duration-300 hover:scale-90"
              />
              <p className="font-semibold text-base sm:text-lg md:text-xl text-green-700">GARDENING TOOLS & SEEDS</p>
              <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-600">
                Gardening tools & seeds enhance curb appeal, support local ecosystems, and provide shade and privacy.
              </p>
               <Link
                to="/product" state={{ category: "Gardening Kit" }}
                className="mt-4 inline-block bg-green-800 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </div>
           
            


          </div>
          
        </div>
      </div>
      <div className=' text-center mt-10'>
            <p className='text-3xl sm:text-4xl md:text-5xl font-bold italic text-green-800 pb-4 pt-4'>Plant Care Tips & Guidance</p>
           <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-center gap-6  lg:pt-30  lg:pb-30 px-4 sm:px-10 lg:px-20">

        
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1 max-w-sm mx-auto sm:w-[45%] lg:w-1/3" data-aos="zoom-out-right">
          <img
            src={c1}
            alt="Container Gardening"
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-green-800">Container Gardening</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Container gardening is a soothing, practical and fun way to build opportunities and
              relationships with the plant kingdom. Bright and colorful points of interest are easy
              to create with planned spacing.
            </p>
            <Link to="/guide" className="mt-3 inline-block text-green-700 font-medium hover:scale-105">
              Read now →
            </Link>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1 max-w-sm mx-auto sm:w-[45%] lg:w-1/3 " data-aos="zoom-in">
          <img
            src={c2}
            alt="Foundation for Plant Care"
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg md:text-xl font-semibold mb-2  text-green-800">Foundation for Plant Care</h3>
            <p className ="text-gray-600 text-sm md:text-base">
              Once we have committed to our chosen plant spaces and selections, it is a gift to
              acknowledge our role in the magic of photosynthesis and its divine results.
            </p>
           <Link to="/guide" className="mt-3 inline-block text-green-700 font-medium hover:scale-105">
              Read now →
            </Link>
          </div>
        </div>

      
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1 max-w-sm mx-auto sm:w-[45%] lg:w-1/3" data-aos="fade-left">
          <img
            src={c3}
            alt="Plant Selection"
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg md:text-xl font-semibold mb-2  text-green-800">Plant Selection</h3>
            <p className
            ="text-gray-600 text-sm md:text-base">
              Before beginning a garden project, plan your ideas for enhancing spaces with plants
              and take things one step at a time. Having seen a certain plant, a particular
              landscape...
            </p>
           <Link to="/guide" className="mt-3 inline-block text-green-700 font-medium hover:scale-105">
              Read now →
            </Link>
          </div>
        </div></div>

          </div>
      
    <div className='bg-white flex flex-col  sm:flex-row gap-6 lg:gap-0 justify-between items-center px-4 sm:px-10 lg:px-20 pb-10 sm:pt-'>
     
      <img src={lov1} alt="love plants" className='w-40 sm:w-48 md:w-56 lg:w-64'/>
      <img src={lov2} alt="love plants" className='w-40 sm:w-48 md:w-56 lg:w-64'/>
      <img src={lov3} alt="love plants" className='w-40 sm:w-48 md:w-56 lg:w-64'/>
    </div>

<div className="bg-green-800 text-white rounded-t-xl">
  <footer className="py-10 px-6 sm:px-10 md:px-14 lg:px-20">
    
    {/* GRID SECTIONS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      
      {/* Logo + About */}
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

export default Home;
