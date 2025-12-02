import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../../../utils/validation";
import Google from "./Google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../../../redux/slice/authSlice";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import api from "../../../axios";
import Loader from "../../../components/Loader";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(false) //combined error state validation + fireabse error
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));

    setErrors("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const validationError = validateLogin(formData);
    if (validationError) {
      setErrors(validationError)
      return
    }

    setErrors("")

    // login feature

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      let user = userCredential.user

      const token = await user.getIdToken();

      const res = await api.post("/api/auth/firebase-login", {token})
      toast.success("Login Succesfull")
      
      if(res.data.user.role === "admin") {
        navigate("/admin")
      } else {
         navigate("/")
      }
     
    } catch (error) {
      setErrors(error.message || "Failed to login")
    } finally {
      setLoading(false)
    }
  };

  if(loading) return <Loader />

  return (
    <div className="py-20">
      <div className="max-w-md mx-auto">
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors}
          </div>
        )}
      </div>
      <div className="bg-white border border-gray-200  rounded-xl shadow-xl p-6 w-full mx-auto max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                checked={formData.remember_me}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white flex justify-center items-center gap-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
                  }`}
              >
                {loading ? <Spinner size="5" /> : "Sign In"}
              </button>
            </div>
          </div>
        </form>

        {/* OR Divider */}
        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Login */}
        <div className="mt-4">
          <Google />
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}