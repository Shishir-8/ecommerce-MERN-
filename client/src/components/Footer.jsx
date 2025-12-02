import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-3">E-comm</h2>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for the latest gadgets and electronics. Quality products, great deals.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-orange-600 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-600 transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-600 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-600 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Quick Links</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-600 transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-600 transition">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-600 transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-600 transition">Contact</Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-orange-600 transition">Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Customer Service</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-orange-600 transition">Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-orange-600 transition">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-orange-600 transition">FAQ</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-orange-600 transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-600 text-sm mb-2">123 Gadget Street, Tech City, USA</p>
            <p className="text-gray-600 text-sm mb-2">Email: support@ecomm.com</p>
            <p className="text-gray-600 text-sm">Phone: +1 (123) 456-7890</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} E-comm. All rights reserved.
        </div>
      </div>
    </footer>
  );
}