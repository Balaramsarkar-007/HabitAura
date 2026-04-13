import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within an authProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {
    checkAuthStatus();
  },[])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/me`);

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuth(true);
        // console.log("user authinticated sucessfully");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        await refreshToken();
      } else{
        setIsAuth(false);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // refresh token
  const refreshToken = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/refresh-token`,{
        withCredentials: true,
        credentials : 'include'
      });

      if (response.data.success) {
        // retry to get user info
        const useResponse = await axios.get(`${baseUrl}/api/auth/me`);
        setUser(useResponse.data.user);
        setIsAuth(true);
      }
    } catch (error) {
      console.log("Refresh token failed", error);
      setIsAuth(false);
      setUser(null);
    }
  };

  // sign up
  const signup = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/signup`, data, {
        withCredentials: true,
        credentials : 'include'
      });
      setUser(response.data.user);
      setIsAuth(true);
      toast.success(`Welcome ${response.data.user.username} 👏!`);
      return {success : true};
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
      throw error;
    } finally{
      setLoading(false);
    }
  };

  // login
  const login = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, data, {
        withCredentials: true,
        credentials : 'include'
      });
      setUser(response.data.user);
      setIsAuth(true);
      toast.success(`Welcome back ${response.data.user.username} 😊!`);
      return { success : true};
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/logout`);
      console.log(response.data);
      toast.success("Sucessfully Logout");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try after sometime");
    } finally {
      setLoading(false);
      setUser(null);
      setIsAuth(false);
    }
  };

  // console.log("Auth context loading", loading);

  const value = {
    user,
    isAuth,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
