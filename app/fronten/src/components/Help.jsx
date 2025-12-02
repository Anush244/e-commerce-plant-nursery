import React, { useState } from "react";

const faqs = [
  {
    question: "How do I choose the right plant?",
    answer:
      "Check the sunlight, water, and space requirements in each plant’s description. Our staff can also suggest plants based on your environment.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, before the order is shipped. Contact us immediately.",
  },
  {
    question: "How long do plants last after delivery?",
    answer:
      "With proper care, most plants thrive for years! Follow the care guide provided.",
  },
  {
    question: "Do you deliver outside my city?",
    answer:
      "Currently, we deliver to selected cities. Contact us for availability.",
  },
];

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <h1 className="text-3xl font-bold text-green-700 mb-6 flex items-center">
         Help & Support
      </h1>
      <p className="mb-8 text-gray-700">
        Welcome to <span className="font-semibold">GreenLeaf Nursery</span>! We’re here to make your plant shopping smooth and enjoyable.
      </p>

    
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"> Ordering & Delivery</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Browse our collection of plants, pots, and gardening supplies.</li>
          <li>Add items to your cart and proceed to checkout.</li>
          <li>Fill in delivery details and payment information.</li>
          <li>Receive confirmation via email or WhatsApp.</li>
        </ul>
        <p className="mt-2 text-gray-700">
          Delivery times: <span className="font-semibold">2–5 business days</span>. Special care is taken to ensure your plants arrive healthy.
        </p>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"> Plant Care Tips</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><span className="font-semibold">Watering:</span> Most indoor plants need water 1–2 times per week.</li>
          <li><span className="font-semibold">Sunlight:</span> Place plants according to their sunlight needs.</li>
          <li><span className="font-semibold">Fertilizing:</span> Use organic fertilizer every 2–4 weeks.</li>
          <li><span className="font-semibold">Repotting:</span> Move plants to bigger pots as they grow.</li>
        </ul>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">🔄 Returns & Exchanges</h2>
        <p className="text-gray-700">
          If a plant arrives damaged or unhealthy, <span className="font-semibold">contact us within 48 hours</span> with a photo. We will replace or refund the plant. Exchanges are available for the same type of plant.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">💳 Payment Options</h2>
        <p className="text-gray-700">
          We accept Credit/Debit Cards, UPI (PhonePe/Google Pay), and Cash on Delivery (select cities). All payments are secure.
        </p>
      </section>

     
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">📞 Contact Us</h2>
        <p className="text-gray-700 mb-2">Phone: <span className="font-semibold">+91-XXXXXXXXXX</span></p>
        <p className="text-gray-700 mb-2">Email: <span className="font-semibold">support@greennursersery.com</span></p>
        <p className="text-gray-700 mb-2">WhatsApp: <span className="font-semibold">+91-XXXXXXXXXX</span></p>
        <p className="text-gray-700">Working Hours: Mon–Sat 9:00 AM – 7:00 PM, Sun 10:00 AM – 5:00 PM</p>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"> Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded shadow-sm">
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-green-50 font-semibold hover:bg-green-100"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-700 bg-white border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"> Green Tips & Resources</h2>
        <p className="text-gray-700">
          Sign up for our newsletter to get <span className="font-semibold">plant care tips</span> and <span className="font-semibold">exclusive offers</span>. Join our community forum to share your plant journey and ask questions.
        </p>
      </section>
    </div>
  );
};

export default HelpPage;
