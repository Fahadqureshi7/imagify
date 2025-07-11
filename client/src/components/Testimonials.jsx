import { assets, testimonialsData } from '../assets/assets';

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center my-20 px-4">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Customer Testimonials</h2>
      <p className="text-base sm:text-lg text-neutral-600 mb-10">
        What Our Users Are Saying
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {testimonialsData.map((value, index) => (
          <div
            key={index}
            className="bg-white/30 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:scale-[1.03] transition-transform duration-300"
          >
            <img
              src={value.image}
              alt={value.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold">{value.name}</h3>
            <p className="text-sm text-neutral-500">{value.role}</p>

            <div className="flex justify-center my-2">
              {Array(value.stars)
                .fill()
                .map((_, starIndex) => (
                  <img
                    key={starIndex}
                    src={assets.rating_star}
                    alt="star"
                    className="w-5 h-5 mx-0.5"
                  />
                ))}
            </div>

            <p className="text-sm text-neutral-700 mt-3 leading-relaxed">{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
