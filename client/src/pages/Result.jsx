import { useContext } from "react";
import axios from 'axios'
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Result = () => {
  const {prompt, setprompt , isLoading , setIsLoading ,image , setImage ,isImageLoaded , setIsImageLoaded , setCreditBalance } = useContext(AppContext)
  const handleInput = (e) => {
    setprompt(e.target.value);
  };

    
   const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post(
      `https://imagify-ymf5.onrender.com/api/image/generate-image`,
      { prompt: prompt },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const { resultImage, creditBalance } = await response.data;

   

    setIsImageLoaded(true);
    setImage(resultImage);
    toast.success('Image created')
    setCreditBalance(creditBalance);
  } catch (error) {
    console.error('Error generating image:', error.response?.data || error.message);
    toast.error(error.response.data.message)
  } finally {
    setIsLoading(false);
  }
};
  return (
    <form
  className="flex flex-col min-h-[90vh] justify-center items-center px-4"
  onSubmit={handleSubmit}
>
  {/* Image Display */}
  {image && (
    <div className="relative mb-6 w-full max-w-md">
      <img
        className="w-full rounded-lg shadow-md object-cover"
        src={image}
        alt="Generated preview"
      />
    </div>
  )}

  {/* Loading Text */}
  {isLoading && (
    <p className="text-sm text-gray-600 mb-4 animate-pulse">
      Generating your image...
    </p>
  )}

  {/* Input Field */}
  {!isImageLoaded ? (
    <div className="w-full max-w-xl space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
  <input
    type="text"
    placeholder="Describe the image you want to generate..."
    className="flex-1 bg-gray-700 text-white text-sm outline-none px-4 py-2 rounded-full placeholder-gray-300 shadow-md"
    value={prompt}
    onChange={handleInput}
  />
  <button
    type="submit"
    className="bg-zinc-900 hover:bg-zinc-800 px-6 py-2 rounded-full text-white text-sm transition duration-200 shadow-md"
    disabled={isLoading || prompt.trim() === ""}
  >
    {isLoading ? "Generating..." : "Generate"}
  </button>
</div>

  ) : (
    // Buttons after image is loaded
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <button
        onClick={() => {
          setIsImageLoaded(null);
          setImage('');
          setprompt('');
        }}
        className="border border-gray-800 rounded-full px-6 py-2 cursor-pointer transition duration-200"
      >
        Generate Another
      </button>
      <a
        href={image}
        download
        className="bg-zinc-900 hover:bg-zinc-800 px-6 py-2 rounded-full text-white text-center"
      >
        Download
      </a>
    </div>
  )}
</form>

  );
};

export default Result;
