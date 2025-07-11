import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import {AppContext} from '../context/AppContext.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';

const Navbar = () => {
  const {user , setUser , showLogin , setShowLogin , creditBalance , getCredit } = useContext(AppContext)
  
  const navigator = useNavigate();


  const handleCloseLoginBtn = () =>{
    setShowLogin(null)
  }

  const handleLogOut = () => {
    const token = localStorage.removeItem('token');
  const user = localStorage.removeItem('user');
    setUser(null);
}
  useEffect(()=>{
    // handleLogOut()
  }, [])
  return (



    <nav className="flex items-center justify-between py-4 px-4 sm:px-8">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40 cursor-pointer" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Credits */}
            <button onClick={()=>navigator('/pricing')} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition">
              <img src={assets.credit_star} className="" alt="Credits" />
              <span className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: <strong>{creditBalance}</strong></span>
            </button>

    
            <div className="flex items-center gap-2">
              <p className="max-sm:hidden pl-4 text-gray-600">Hi, {user?.name}</p>
              <div className='relative group'>
                
                <img
                src={assets.profile_icon}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 drop-shadow-2xl"
                alt="Profile"
                />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 pt-12 text-black rounded'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
               <li className='py-1 px-3 cursor-pointer whitespace-nowrap' onClick={handleLogOut}>Log out</li>
                </ul>

              </div>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 sm:gap-6">
            <p
              className="cursor-pointer text-sm text-gray-700 hover:text-black"
              onClick={() => navigator('/pricing')}
            >
              Pricing
            </p>
            <button className="bg-zinc-800 text-white px-6 py-2 text-sm rounded-full hover:bg-zinc-700 transition"
            onClick={()=>setShowLogin('login')}
            >
              Login 
            </button>
           {showLogin === 'login' && (
        <Login onSwitchToLogin={() => setShowLogin('signup')} closeBtn ={handleCloseLoginBtn} />
      )}
      {showLogin === 'signup' && (
        <SignUp onSwitchToSignUp={() => setShowLogin('login')} closeBtn ={handleCloseLoginBtn} />
        )}
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
