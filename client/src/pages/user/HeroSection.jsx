

import { useState, useEffect } from "react";

export default function HeaderSlider() {
  const slides = [
    { title: "Big Sale Today!",
    subtitle: "Up to 50% off",
    imgSrc: "/headphone.png" },

    { title: "New Arrivals",
     subtitle: "Check out our latest collection",
     imgSrc: "/iphone1.png" },

    { title: "Trending Now",
    subtitle: "Best deals just for you",
    imgSrc: "/laptop1.png" },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  return (
    <div className="w-full overflow-hidden relative max-w-full py-5">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`w-full transition-all duration-700 ease-in-out ${
            index === current ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200  p-6 md:p-12 rounded-xl">
            {/* Text */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg mb-4">{slide.subtitle}</p>
              <button className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700">
                Shop Now
              </button>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-80  overflow-hidden">
              <img
                src={slide.imgSrc}
                alt={slide.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}