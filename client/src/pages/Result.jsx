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
      `${process.env.REACT_APP_BACKEND_URL}/api/image/generate-image`,
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
      <div className="relative mb-6">
        <img
          className="max-w-sm w-full rounded-lg shadow-md"
          src={image}
          alt="Sample preview"
        />
        <span className="absolute bottom-0 left-0 h-1 bg-blue-400 w-0 transition-all duration-300" />
      </div>

      {isLoading && (
        <p className="text-sm text-gray-600 mb-4 animate-pulse">Generating your image...</p>
      )}
      {
        !isImageLoaded ? (

          <div className="flex w-full max-w-xl bg-gray-700 text-white text-sm p-1 rounded-full shadow-md">
        <input
          type="text"
          placeholder="Describe the image you want to generate..."
          className="flex-1 bg-transparent outline-none px-4 py-2 rounded-full placeholder-gray-300"
          value={prompt}
          onChange={handleInput}
          />
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 px-6 sm:px-10 py-2 rounded-full transition-all duration-200 cursor-pointer"
          disabled={isLoading || prompt.trim() === ''}
          >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
          ) : (
            <div className="flex gap-4 mt-4">
          <p className="border border-gray-800 rounded-full px-4 py-2 cursor-pointer transition-all duration-200"
          onClick={()=>setIsImageLoaded(null)}>Generate Another</p>
          <a href={image} download className="bg-zinc-900 hover:bg-zinc-800 px-6 sm:px-10 py-2 transition-all duration-200 rounded-full text-white cursor-pointer">Download</a>
          </div>
          )
        }
        </form>
  );
};

export default Result;
