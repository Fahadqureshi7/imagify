import {Routes ,  Route } from "react-router-dom"
import Home from "./pages/Home"
import Pricing from "./pages/Pricing"
import Result from "./pages/Result"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoutes from "./components/ProtectedRoutes"
import {Toaster} from 'react-hot-toast'

const App = () => {

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen 
    bg-gradient-to-b fill-teal-50 to-orange-50'>
      <Toaster position="top-center" />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pricing" element={<Pricing/>}/>

        <Route path="/result" element={
          <ProtectedRoutes>
            <Result/>
          </ProtectedRoutes>
          }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App 