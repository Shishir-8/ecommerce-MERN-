import { FaStar, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Jane Doe",
    review:
      "Absolutely love this store! The products are top quality and delivery was super fast. Highly recommend!",
    rating: 5,
    img: "/user1.jpg",
  },
  {
    name: "John Smith",
    review:
      "Great shopping experience. Easy navigation, fast checkout, and excellent customer support.",
    rating: 4,
    img: "/user2.jpg",
  },
  {
    name: "Emily Johnson",
    review:
      "The deals and offers are amazing. I got my favorite gadget at half price! Will buy again.",
    rating: 5,
    img: "/user3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className=" mb-20 py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          What Our Customers Say
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={testimonial.img}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-orange-300"
            />
            <p className="text-gray-700 mb-4">{testimonial.review}</p>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) =>
                i < testimonial.rating ? (
                  <FaStar key={i} className="text-orange-500 mr-1" />
                ) : (
                  <FaRegStar key={i} className="text-gray-300 mr-1" />
                )
              )}
            </div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}