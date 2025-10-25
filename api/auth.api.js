// src/api/auth.api.js
import { axiosClient as axios} from './axiosClient.js'

// Register
export const registerUser = async (payload) => {
  const res = await  axios.post('/auth/register', payload);
  // assuming server returns { message, data?, token? }
  return res.data || res;
};

// Login
export const loginUser = async (payload) => {
  const res = await  axios.post('/auth/login', payload);
  return res.data || res;
};

// Get Profile
export const getProfile = async () => {
  const res = await  axios.get('/auth/Profile');
  return res.data || res;
};

// Logout
export const logoutUser = async () => {
  const res = await  axios.post('/auth/logout');
  return res.data || res;
};

// Send reset token (email)
export const sendResetToken = async (payload) => {
  const res = await  axios.post('/auth/send-reset-token', payload);
  return res.data || res;
};

// Reset password with token
export const resetPassword = async (token, payload) => {
  const res = await  axios.post(`/auth/reset-password/${token}`, payload);
  return res.data || res;
};
// Verify token validity
export const verifyToken = async () => {
  const res = await axiosClient.post('/auth/verify-token');
  return res.data || res;
};

export const generateOtp = async (email,type) => {
  const res = await axiosClient.post("/otp/generate", { email });
  console.log("generateOtp response:", res);
  return res.data || res;
};

export const verifyOtp = async ({ email, otp }) => {
  const res = await axiosClient.post("/otp/verify", { email, otp });
  return res.data || res;
};