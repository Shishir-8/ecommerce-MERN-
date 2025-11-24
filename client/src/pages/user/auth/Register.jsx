import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateRegister } from "../../../utils/validation";
import Google from "./Google";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import api from "../../../axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../../redux/slice/authSlice";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const validationErrors = validateRegister(formData)
    if (validationErrors) {
      setErrors(validationErrors)
      return
    }
    setErrors("")


    // create user with email and password
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      let user = userCredential.user
      await updateProfile(user, {displayName: name})

      const token = await user.getIdToken();

      await api.post('/api/auth/firebase-login', {token})
      toast.success("Registration succesfull")
      navigate("/")

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
    } catch (error) {
      setErrors(error.message)
    } finally {
      setLoading(false)
    }
  };



  return (
    <div className="py-10">
      <div className="max-w-md mx-auto">
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full mx-auto max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">
            Please fill out the form to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white flex justify-center items-center gap-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
                  }`}
              >
                {loading ? <Spinner size="5" /> : "Sign Up"}
              </button>
            </div>

          </div>
        </form>

        {/* Google Signup */}
        <div className="mt-4">
          <Google />
        </div>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}