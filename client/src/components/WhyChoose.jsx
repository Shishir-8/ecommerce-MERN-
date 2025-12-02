import { FaShippingFast, FaHeadset, FaLock, FaUndo } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={28} className="text-orange-500" />,
    title: "Fast & Free Shipping",
    desc: "Get your orders delivered quickly with free shipping on all items.",
  },
  {
    icon: <FaHeadset size={28} className="text-orange-500" />,
    title: "24/7 Customer Support",
    desc: "We’re here to help anytime. Chat, call, or email us anytime.",
  },
  {
    icon: <FaLock size={28} className="text-orange-500" />,
    title: "Secure Payment",
    desc: "Your transactions are safe and encrypted with our secure system.",
  },
  {
    icon: <FaUndo size={28} className="text-orange-500" />,
    title: "Easy Returns",
    desc: "Not satisfied? Return your product easily within 30 days.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 md:px-16 mb-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Why Choose Us
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          We provide the best online shopping experience for our customers
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}