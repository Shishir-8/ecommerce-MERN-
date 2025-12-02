import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get In Touch
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We’re here to help! Whether you need product support, have questions, 
            or just want to say hello – reach out to us anytime.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {/* Phone */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <FaPhoneAlt className="text-orange-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-gray-600 mt-2">+977-9876543210</p>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-orange-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-gray-600 mt-2">support@example.com</p>
          </div>

          {/* Location */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt className="text-orange-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="text-gray-600 mt-2">Kathmandu, Nepal</p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-start">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-600">
              Have any questions? Fill out the form and our team will get back to you
              within 24 hours.
            </p>
          </div>

          {/* FORM */}
          <form className="bg-white p-8 rounded-2xl shadow-xl space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border focus:outline-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border focus:outline-orange-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded-lg border focus:outline-orange-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border h-32 resize-none focus:outline-orange-500"
            ></textarea>

            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              Send Message
            </button>
          </form>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-600">Google Map Integration Here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}