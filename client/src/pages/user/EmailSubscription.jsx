import { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setError("");
    setEmail("");
  };

  return (
    <section className="mb-20 bg-gray-100 relative py-20 px-6 md:px-16  overflow-hidden rounded-xl flex justify-center items-center">
      {/* Floating Shapes */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-orange-200 rounded-full opacity-10 -z-10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-orange-300 rounded-full opacity-10 -z-10 blur-2xl animate-pulse-slow"></div>

      <div className="max-w-3xl w-full text-center flex flex-col items-center gap-8">
        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
            Stay Updated with Our Latest Offers 🎉
          </h2>
          <p className="text-gray-700 mb-6 text-md md:text-lg">
            Subscribe to our newsletter and never miss new arrivals, exclusive deals, and special discounts.
          </p>

          {/* Small Benefits */}
          <div className="flex flex-wrap gap-4 justify-center mb-6 text-gray-600 text-sm">
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <FiMail className="text-orange-500" /> Exclusive Offers
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <FiMail className="text-orange-500" /> Free Shipping
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <FiMail className="text-orange-500" /> Early Access
            </div>
          </div>

          {/* Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full sm:w-[350px] px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 hover:scale-105 hover:shadow-xl transition transform w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="mt-4 bg-green-100 text-green-800 py-3 px-5 rounded-md font-medium inline-block">
              🎉 Thank you for subscribing! Check your inbox for confirmation.
            </div>
          )}

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>

      </div>
    </section>
  );
}