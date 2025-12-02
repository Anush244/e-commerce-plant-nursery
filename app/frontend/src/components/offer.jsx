import React from "react";

const offers = [
  {
    title: " Seasonal Plant Sale",
    description: "Enjoy up to 30% off on selected flowering plants. Perfect for decorating your home or garden this season. Hurry — limited stock available!",
  },
  {
    title: " Bundle Deals",
    description: "Buy 3 small indoor plants and get 1 free. Mix and match any of our indoor plant collection. Great for gifting or creating a cozy indoor garden.",
  },
  {
    title: " Gardening Supplies Discount",
    description: "Get 20% off on pots, fertilizers, and gardening tools. Stock up on essentials to keep your plants healthy and happy.",
  },
  {
    title: " New Customer Special",
    description: "First-time buyers get 10% off their first order. Use code: GREEN10 at checkout.",
  },
];

const OffersPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
     
      <h1 className="text-3xl font-bold text-green-700 mb-6 flex items-center">
         Special Offers
      </h1>
      <p className="mb-8 text-gray-700">
        Discover amazing deals at <span className="font-semibold">GreenLeaf Nursery</span>! Enjoy discounts, seasonal offers, and bundle deals just for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer, index) => (
          <div key={index} className="bg-green-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-700 mb-4">{offer.description}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Shop Now
            </button>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">⏰ Limited Time Offers</h2>
        <p className="text-gray-700 mb-4">
          Keep an eye on our website — offers change every month. Subscribe to our newsletter to get exclusive early access to upcoming sales.
        </p>

        <h2 className="text-2xl font-semibold mb-4 flex items-center"> Why Shop Our Offers?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Fresh, healthy plants delivered with care</li>
          <li>Sustainable and eco-friendly gardening products</li>
          <li>Easy online ordering and fast delivery</li>
          <li>Exclusive deals to make your plant collection flourish</li>
        </ul>
      </section>
    </div>
  );
};

export default OffersPage;
