import React from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'dotenv/config'

const SignUp = ({closeBtn , onSwitchToSignUp}) => {
  const {emailInput , setEmailInput , passwordInput , setPasswordInput , name , setName , setShowLogin }  = useContext(AppContext)

  // const navigate = useNavigate()
  
  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/signup`, {
      name : name ,
      email: emailInput,
      password: passwordInput,
    });
    toast.success('Account created successfully!');
    setShowLogin('login')
    setName('')
    setEmailInput('')
    setPasswordInput('')
    const { user, token } = response.data;     
  
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));


  } catch (error) {
    console.error('Signup failed:', error);
     toast.error(error.response?.data?.error || 'Signup failed');
    
  }
};

    
  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        className="relative bg-white p-10 rounded-xl text-slate-500 max-w-md  "
        style={{ opacity: 1, transform: 'none' }}
        onSubmit={handleSignup}
      >
        <img
          src={assets.cross_icon} // replace with actual close icon
          alt="Close"
          className="absolute top-5 right-5 w-4 cursor-pointer"
          onClick={closeBtn}
        />
        <h1 className="text-center text-neutral-700 text-2xl font-medium mb-1">Sign Up</h1>
        <p className="text-sm text-center mb-4">Please sign up to continue</p>

        <div className="border border-gray-300 px-5 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.profile_icon} alt="User Icon" className="w-5" /> 
          <input
                value={name}

            className="outline-none text-sm font-medium w-full"
            type="text"
            placeholder="Full Name"
            required
                onChange={(e)=>{setName(e.target.value)}}

          />
        </div>

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
          <img src={assets.lock_icon} alt="Password Icon" className="w-3" /> 
          <input
                value={passwordInput}

            className="outline-none text-sm font-medium w-full"
            type="password"
            placeholder="Password"
            required
                onChange={(e)=>{setPasswordInput(e.target.value)}}

          />
        </div>

        {/* Forgot Password */}
        <p className="text-sm text-blue-600 my-4 cursor-pointer text-right">
          Forgot password?
        </p>

        {/* Create Account Button */}
        <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer">
          Create Account
        </button>

        {/* Login Redirect */}
        <p className="mt-5 text-center text-md">
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer"
          onClick={onSwitchToSignUp}
          >Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
