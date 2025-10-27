import { axiosClient } from './axiosClient.js';

// Register
export const registerUser = async (payload) => {
  const { data } = await axiosClient.post('/auth/register', payload);
  return data;
};
export const ChnagePassword = async (payload) => {
  
  const { data } = await axiosClient.post('/auth/change-password', payload);
  return data;
}

// Login
export const loginUser = async (payload) => {
  const { data } = await axiosClient.post('/auth/login', payload);
  return data;
};

// Get Profile
export const getProfile = async () => {
  const { data } = await axiosClient.get('/auth/profile');
  return data;
};

// Logout
export const logoutUser = async () => {
  const { data } = await axiosClient.post('/auth/logout');
  return data;
};

// Send reset token (email)
export const sendResetToken = async (payload) => {
  console.log("sendResetToken payload:", payload);
  const { data } = await axiosClient.post('/auth/send-reset-token', payload);
  return data;
};

// Reset password with token
export const resetPassword = async ( payload) => {
  const { data } = await axiosClient.post(`/auth/reset-password`, payload);
  return data;
};

// Verify token validity
export const verifyToken = async () => {
  const { data } = await axiosClient.post('/auth/verify-token');
  return data;
};

// Generate OTP
export const generateOtp = async (payload) => {
  const { data } = await axiosClient.post('/otp/generate', payload);
  return data;
};

// Verify OTP
export const verifyOtp = async (payload) => {
  const { data } = await axiosClient.post('/otp/verify', payload);
  console.log("verifyOtp response data:", data);
  return data;
};

export const reportIssue = async (payload) => {
  const { data } = await axiosClient.post("/report", payload);
  return data;
};
// ✅ Get all notifications for the logged-in user
export const getNotifications = async () => {
  const { data } = await axiosClient.get("/Notification/all");
  return data;
};

// ✅ Mark all as read
export const markAllAsRead = async () => {
  const { data } = await axiosClient.post("/Notification/mark-read");
  return data;
};