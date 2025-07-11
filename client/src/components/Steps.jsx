import { stepsData } from "../assets/assets";

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center">How it works</h2>
      <p className="text-base sm:text-lg text-gray-600 text-center mt-2 mb-8">
        Transform Words Into Stunning Images
      </p>

      {/* Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {stepsData.map((val, index) => (
          <div
            key={index}
            className="flex items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img src={val.icon} className="w-10 sm:w-12 mr-4 mt-1" alt="Step Icon" />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1">{val.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{val.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
