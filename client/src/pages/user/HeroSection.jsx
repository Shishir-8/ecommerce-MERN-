import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Upgrade Your Tech",
      subtitle: "Premium gadgets for modern lifestyle",
      description:
        "Discover our exclusive collection of top-quality electronics, curated for tech enthusiasts.",
      imgSrc: "/headphone.png",
      cta: "Shop Now",
    },
    {
      title: "New Arrivals",
      subtitle: "Latest gadgets in 2025",
      description:
        "Stay ahead with the newest designs and features. Perfect for personal or professional use.",
      imgSrc: "/iphone1.png",
      cta: "Explore Collection",
    },
    {
      title: "Trending Now",
      subtitle: "Most loved products",
      description:
        "Check out what’s trending among our customers and grab your favorites today.",
      imgSrc: "/laptop1.png",
      cta: "See Trending",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 7000);
    return () => clearInterval(timer);
  }, [length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);

  return (
    <section className="mb-20 relative w-full h-[80vh] md:h-[90vh] bg-gray-100 overflow-hidden flex items-center">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100 z-20" : "opacity-0 z-0"
            }`}
        >
          <div className="flex flex-col-reverse md:flex-row items-center justify-between h-full px-6 md:px-24 py-10 relative">
            {/* Elegant floating shapes */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-16 w-56 h-56 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>

            {/* Text */}
            <div className="md:w-2/5 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 drop-shadow-sm">
                {slide.subtitle}
              </p>
              <p className="text-md md:text-lg text-gray-600 mb-8">
                {slide.description}
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-10 py-4 bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:bg-orange-700 hover:scale-105 transition transform"
              >
                {slide.cta}
              </button>
            </div>

            {/* Image */}
<div className="md:w-3/5 relative h-80 md:h-[28rem] flex justify-center items-center">

  {/* Minimal Background Circles */}
  <div className="absolute -top-12 left-10 w-44 h-44 bg-orange-300 rounded-full opacity-25"></div>
  <div className="absolute bottom-4 right-10 w-60 h-60 bg-green-200 rounded-full opacity-40"></div>

  {/* Image */}
  <img
    src={slide.imgSrc}
    alt={slide.title}
    className="h-full w-auto object-contain relative z-10"
  />
</div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${i === current ? "bg-orange-600 w-4" : "bg-gray-400/50"
              }`}
          ></span>
        ))}
      </div>
    </section>
  );
}