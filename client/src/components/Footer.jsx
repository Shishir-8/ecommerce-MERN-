import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className=" text-gray-600 text-center py-5  mt-20 border-t border-gray-300">
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">ShopEase</span>. All rights reserved.{" "}
        <Link to="/privacy" className="hover:text-orange-500 transition-colors">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link to="/terms" className="hover:text-orange-500 transition-colors">
          Terms
        </Link>
      </p>
    </footer>
  );
}