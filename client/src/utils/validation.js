// src/utils/validation.js

// Register form validation
export const validateRegister = (data) => {
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    return "All fields are required";
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    return "Email is invalid";
  }
  if (data.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (data.password !== data.confirmPassword) {
    return "Passwords do not match";
  }
  return ""; // no error
};

// Login form validation
export const validateLogin = (data) => {
  if (!data.email || !data.password) {
    return "All fields are required";
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    return "Email is invalid";
  }
  return ""; // no error
};