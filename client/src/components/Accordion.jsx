import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, PayPal, and Apple Pay.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free shipping on orders over $50 within the USA.",
  },
  {
    question: "Can I return a product if I don’t like it?",
    answer: "Absolutely! You can return products within 30 days of purchase for a full refund.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you’ll receive a tracking number via email.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 md:px-16  mb-20 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-gray-800 font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                <FiChevronDown
                  className={`text-orange-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={22}
                />
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  height:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                }}
                className="px-6 overflow-hidden transition-[height] duration-400 ease-in-out"
              >
                <p className="text-gray-600 py-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}