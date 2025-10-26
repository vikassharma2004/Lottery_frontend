import {axiosClient} from "./axiosClient.js"; // make sure this points to your configured axios instance

// 1️⃣ Create a withdraw request (user)
export const createWithdrawRequest = async (amount, upiId) => {
  const { data } = await axiosClient.post("/withdraw/create-withdraw-request", { amount, upiId });
  return data;
};

// 2️⃣ Get current user's withdraw requests
export const getUserWithdrawRequests = async () => {
  const { data } = await axiosClient.get("/withdraw/user-withdraw-requests");
  return data;
};


// payemnt methods
export const createRazorpayOrder = async () => {
  const { data } = await axiosClient.post("/payment/order");
  return data;
};
export const verifyRazorpayPayment = async (payload) => {
  const { data } = await axiosClient.post("/payment/verify-payment", payload);
  return data;
};

