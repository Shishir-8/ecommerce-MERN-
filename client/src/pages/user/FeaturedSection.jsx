

const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1681302427948-2fd0eca629b1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedSection = () => {
  return (
    <section className="mb-20 bg-gray-100 p-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Featured Sections
        </h2>
        <div className="w-30 h-1 bg-orange-600 mt-2 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-6">
        {products.map(({ id, image, title, description }) => (
          <div
            key={id}
            className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
          >
            {/* Product Image */}
            <div className="relative w-full h-[400px]">
              <img
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3 transform group-hover:-translate-y-2 transition-transform duration-300">
              <h3 className="font-semibold text-xl lg:text-2xl">{title}</h3>
              <p className="text-sm text-gray-200 leading-snug">{description}</p>

              <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md text-sm font-medium transition-all duration-300">
                Buy Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection