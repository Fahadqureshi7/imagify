import { useEffect } from "react";
import { createContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";


export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(null);
  const [name , setName] = useState('')
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [prompt, setprompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(null);
  const [creditBalance, setCreditBalance] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken) {
    setToken(savedToken); 
  }

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
  setIsAuthLoading(false)
}, []);

  const getCredits = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/credit`, {
     headers: {
  Authorization: `Bearer ${token}`,
}
    });
    setCreditBalance(data.credits);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user))
  };
  useEffect(
    () => {
      if (token) {
        getCredits();
      }
    },
    [token]
  );

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    name , setName,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    prompt,
    setprompt,
    isLoading,
    setIsLoading,
    image,
    setImage,
    isImageLoaded,
    setIsImageLoaded,
    creditBalance,
    setCreditBalance,
    getCredits,
    isAuthLoading
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
