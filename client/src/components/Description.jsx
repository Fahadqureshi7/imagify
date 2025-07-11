import { assets } from "../assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 px-4 sm:px-8 md:px-20 lg:px-28">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-center">
        Create AI Images
      </h2>
      <p className="text-neutral-600 mt-2 text-base sm:text-lg text-center">
        Turn your imagination into visuals
      </p>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mt-10 max-w-6xl w-full">
        {/* Text */}
        <div className="md:w-1/2">
          <h3 className="font-semibold text-2xl sm:text-3xl mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
          </p>
        </div>

        {/* Image */}
        <img
          src={assets.sample_img_1}
          alt="AI Generated Sample"
          className="w-full md:w-1/2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-md object-cover"
        />
      </div>
    </div>
  );
};

export default Description;
