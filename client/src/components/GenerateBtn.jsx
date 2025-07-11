import { useContext} from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const GenerateBtn = () => {
  const {user , setShowLogin} = useContext(AppContext)
  const navigator = useNavigate()

  const handleNavigation = () => {
   user ? navigator('/result') : setShowLogin('login')
  }
  return (
        <div className="pb-16 mt-28 text-center ">
        <h1 className="text-3xl md:text-3xl lg:text-5xl mt-4 font-semibold text-neutral-800 py-6">See the magic. Try now</h1>
        <button className=" text-xl inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 cursor-pointer"
        onClick={handleNavigation}
        >Generate Images 
            <img src={assets.star_group} className="w-7" alt="" />
            </button>
            </div>
  )
}

export default GenerateBtn