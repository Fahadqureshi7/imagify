import { assets } from '../assets/assets'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import {toast} from 'react-hot-toast'
import 'dotenv/config'


const Login = ({closeBtn , onSwitchToLogin}) => {
  const {setUser , emailInput , passwordInput , setEmailInput , setPasswordInput} = useContext(AppContext)
  const navigate = useNavigate()
  
  const handleLoginUser = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`, {
      email: emailInput,
      password: passwordInput,
    });

    toast.success('user login successfully')
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user); 
    navigate('/');
  } catch (error) {
    console.error('Login failed:', error);
    toast.error(error.response?.data?.error || 'login failed')
  }
};

    
  return (
    <>
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
          <form
            className="relative bg-white p-10 rounded-xl text-slate-500 max-w-md  "
            style={{ opacity: 1, transform: 'none' }}
            onSubmit={handleLoginUser}
          >
            <img
              src={assets.cross_icon} 
              alt="Close"
              className="absolute top-5 right-5 w-4 cursor-pointer"
              onClick={closeBtn}
            />
            <h1 className="text-center text-neutral-700 text-2xl font-medium mb-1">Login</h1>
            <p className="text-sm text-center mb-4">Welcome back! Please Login continue</p>
    
            <div className="border border-gray-300 px-5 py-2 flex items-center gap-2 rounded-full mt-4">
              <img src={assets.email_icon} alt="Email Icon" className="w-4" />
              <input
                value={emailInput}
                className="outline-none text-sm font-medium w-full"
                type="email"
                placeholder="Email ID"
                required
                onChange={(e)=>setEmailInput(e.target.value)}
              />
            </div>
    
            <div className="border border-gray-300 px-5 py-2 flex items-center gap-2 rounded-full mt-4">
              <input
                value={passwordInput}
                className="outline-none text-sm font-medium w-full"
                type="password"
                placeholder="Password"
                required
                onChange={(e)=>{setPasswordInput(e.target.value)}}
              />
            </div>
    
            <p className="text-sm text-blue-600 my-4 cursor-pointer text-right">
              Forgot password?
            </p>
    
            <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer"
            >
              Login
            </button>
    
            <p className="mt-5 text-center text-md">
              Don't have an account?{' '}
              <span className="text-blue-600 cursor-pointer"
              onClick={onSwitchToLogin}
              >
                Sign Up
                </span>
            </p>
          </form>
        </div>
    </>
  )
}

export default Login