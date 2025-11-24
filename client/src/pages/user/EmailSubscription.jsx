
import { useState } from "react";

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

    // Here you could send the email to your backend or an API route
    // Example: await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });

    setSubmitted(true);
    setError("");
    setEmail("");
  };

  return (
    <section className="mt-20 bg-gray-100 py-16 px-6 md:px-14">
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Stay Updated with Our Latest Offers 🎉
        </h2>
        <p className="text-gray-600 mt-3">
          Subscribe to our newsletter and never miss new arrivals, discounts, and exclusive deals.
        </p>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-[400px] px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700 transition-colors w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="mt-8 bg-green-100 text-green-800 py-3 px-5 rounded-md font-medium">
            🎉 Thank you for subscribing! Check your inbox for confirmation.
          </div>
        )}

        {/* Error message */}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </section>
  );
}