import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // corrected import

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigation = () => {
    user ? navigate('/result') : setShowLogin('login');
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center my-10 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex text-xs sm:text-sm text-stone-500 gap-2 px-4 py-1 bg-white border rounded-full border-neutral-400">
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" className="w-4 sm:w-5" />
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[90%] sm:max-w-[650px] mx-auto mt-10 font-semibold leading-tight">
        Turn text to <br />
        <span className="text-blue-600">images</span>, in seconds
      </h1>

      <p className="text-base sm:text-lg md:text-xl mt-6 text-gray-700 max-w-[90%] sm:max-w-2xl">
        Unleash your creativity with AI. Turn your imagination into visual art in seconds –
        just type, and watch the magic happen.
      </p>

      <button
        className="flex gap-2 items-center justify-center text-center bg-black text-white rounded-full px-8 sm:px-10 py-3 mt-7 text-base sm:text-lg hover:scale-105 transition-transform"
        onClick={handleNavigation}
      >
        <p>Generate Images</p>
        <img src={assets.star_group} alt="stars" className="w-5 sm:w-6" />
      </button>

      <div className="flex flex-wrap justify-center gap-4 mt-8 px-2 sm:px-0">
        {Array(6)
          .fill('')
          .map((_, index) => (
            <img
              key={index}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              className="rounded-xl w-24 h-24 sm:w-28 sm:h-28 object-cover hover:scale-105 transition-transform cursor-pointer"
              alt="sample"
            />
          ))}
      </div>

      <p className="text-sm sm:text-base text-gray-600 mt-4">
        Generated images from Imagify !!
      </p>
    </motion.div>
  );
};

export default Header;
