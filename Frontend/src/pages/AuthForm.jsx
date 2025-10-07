import React, { useState } from "react";
import logo2 from "../assist/logo2.png";
import TextInput from "../components/common/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import Loading from "../components/common/Loading";
import { motion, AnimatePresence } from 'framer-motion';

const getValidationSchema = (authMode) => {
  const baseSchema = {
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }

  if (authMode === "signup") {
    baseSchema.username = yup.string().required("Enter username");
  }

  return yup.object(baseSchema);
} 

function AuthForm() {
  const [authMode, setAuthMode] = useState("signup");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(getValidationSchema(authMode)), mode: 'onChange' });
  const navigate = useNavigate();
  const {signup, login, loading} = useAuth();

  const handleAuthModeChange = (mode) => {
    setAuthMode(mode);
    reset();
  }

  const onSubmit = async (data) => {
    console.log(data);

    try {
      if(authMode === 'signup'){
        await signup(data);
      } else {
        await login(data);
      }
      navigate('/dashboard/overview');
    } catch (error) {
      console.log("Auth error", error);
    }
  }

  if(loading){
    return (
      <Loading />
    )
  }

  return (
    <motion.div 
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 }}
    className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src={logo2}
            className="w-16 md:w-20 mx-auto object-contain"
            alt="HabitAura Logo"
          />
          <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
            HabitAura
          </h2>
          {authMode === "login" ? (
            <p className="text-sm md:text-base text-gray-600">
              Welcome back! Sign in to continue your journey.
            </p>
          ) : (
            <p className="text-sm md:text-base text-gray-600">
              Start building better habits today.
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
           className="flex gap-2 mb-6">
            <div
              onClick={() => handleAuthModeChange('login')}
              className={`flex-1 py-2 px-4 text-sm  md:text-lg font-medium rounded-lg cursor-pointer text-center transition-colors ${
                authMode === "login"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sign In
            </div>
            <div
              onClick={() => handleAuthModeChange("signup")}
              className={`flex-1 py-2 px-4 text-sm md:text-lg text-center font-medium rounded-lg transition-colors cursor-pointer ${
                authMode === "signup"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sign Up
            </div>
          </motion.div>

          {/* Add your form fields here */}
          <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {authMode == "signup" && (
              <motion.div 
              initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              className="mt-4">
                <TextInput
                  label="Username"
                  required = {true}
                  placeholder="xyz"
                  register={register("username")}
                  error={errors.username?.message}
                />
              </motion.div>
            )}
            </AnimatePresence>
              <>
                <div className="mt-4">
                  <TextInput
                    label="Email"
                    placeholder="example@gmail.com"
                    required = {true}
                    register={register('email')}
                    error={errors.email?.message}
                  />
                </div>
                <div className="mt-4">
                  <TextInput
                    label="Password"
                    type="password"
                    placeholder="8#3kZ!qW5fP7&"
                    required={true}
                    register={register('password')}
                    error={errors.password?.message}
                  />
                </div>
              </>


             <div className="mt-4 flex justify-center p-4"> 
            {authMode === "login" ? (
              <button 
              type="submit"
              className="flex-1 py-2 md:py-3 px-4 text-sm  md:text-lg font-medium rounded-2xl cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
              >Sign In <MoveRight className="inline-block ml-2" /> </button>
            ) : (
             <button 
              type="submit"
              className="flex-1 py-2 md:py-3 px-4 text-sm  md:text-lg font-medium rounded-2xl cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
              >Create Account <MoveRight className="inline-block ml-2" /> </button>
            )}
            </div>           
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthForm;
