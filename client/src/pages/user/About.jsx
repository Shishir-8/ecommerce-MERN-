export default function AboutPage() {
  return (
    <div className="text-gray-800">

      {/* HERO SECTION */}
{/* HERO SECTION – FULL HEIGHT */}
<section className="w-full bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 grid md:grid-cols-2 gap-10 items-center min-h-[60vh]">
    
    {/* Text */}
    <div>
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        About <span className="text-orange-600">Our Brand</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-md">
        We are dedicated to providing high-quality products with a seamless
        shopping experience. Our mission is to bring innovation, comfort,
        and affordability together — for everyone.
      </p>
    </div>

    {/* Hero Image */}
    <div className="flex justify-center">
      <img
        src="https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlfGVufDB8fDB8fHww"
        className="rounded-2xl w-full max-w-md md:max-w-xl object-cover"
        alt="About Hero"
        loading="lazy"
      />
    </div>

  </div>
</section>

      {/* OUR STORY */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Our journey began with a simple idea: make quality accessible. Over
            the years, we've expanded our product range, improved our service,
            and built a community of loyal customers who trust our brand.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4 text-orange-600">
            Our Mission
          </h3>
          <p className="text-gray-600">
            To provide premium quality products with unmatched customer support
            at prices everyone can afford.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4 text-orange-600">
            Our Vision
          </h3>
          <p className="text-gray-600">
            To become a global leader in innovative and sustainable products
            that impact everyday lives positively.
          </p>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["Quality", "Innovation", "Customer Support", "Trust", "Sustainability", "Affordability"].map(item => (
              <div
                key={item}
                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition text-center"
              >
                <h4 className="text-xl font-semibold text-orange-600 mb-3">
                  {item}
                </h4>
                <p className="text-gray-600">
                  We focus on {item.toLowerCase()} to maintain a strong brand
                  and deliver only the best experience.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "120+", label: "Premium Products" },
            { number: "4.8/5", label: "Customer Rating" },
            { number: "5+", label: "Years of Experience" },
          ].map(stat => (
            <div key={stat.label} className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-orange-600">
                {stat.number}
              </h3>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-orange-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Want to Explore More?
        </h2>
        <p className="text-lg mb-6">
          Browse our premium products crafted just for you.
        </p>
        <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Explore Products
        </button>
      </section>

    </div>
  );
}