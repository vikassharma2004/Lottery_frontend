// src/hooks/useLogin.js
import { useMutation, useQuery } from '@tanstack/react-query';
import * as AuthAPI from '../api/auth.api.js';
import * as WithdrawAPI from '../api/withdraw.api.js';
import { useUserStore } from '../store/AuthStore.js';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
export const useLogin = () => {
  const setAuth = useUserStore((s) => s.setAuth);

  return useMutation({
    mutationFn: AuthAPI.loginUser,
    onSuccess: async(res) => {
        console.log("Login response:", res);
      if (res.token && res.user?.role !== 'admin') {
        await   AsyncStorage.setItem("auth_token", res.token);
       await  setAuth(res.token, res.user);
        Toast.show({ type: 'success', text1: 'Login successful' });
      } else {
        Toast.show({ type: 'error', text1: 'Admins cannot log in here' });
      }
    },
    onError: (error) => {
      Toast.show({ type: 'error', text1: 'Login failed', text2: error.message });
      return;
    },
  });
};
export const useVerifyToken = () => {
  const router = useRouter();
  const { clearAuth } = useUserStore();

  return useMutation({
    mutationFn: AuthAPI.verifyToken,
    onSuccess: (data) => {
      if (!data.valid) {
        clearAuth();
        Toast.show({
          type: "error",
          text1: "Session expired",
          text2: "Please log in again.",
        });
        router.replace("/Login");
      }
    },
    onError: () => {
      clearAuth();
      Toast.show({
        type: "error",
        text1: "Session expired",
        text2: "Please log in again.",
      });
      router.replace("/Login");
    },
  });
};
export const useProfile = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useQuery({
    queryKey: ["profile"],
    queryFn: AuthAPI.getProfile,
    retry: false, // do not retry automatically
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user); // update Zustand store
      }
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to fetch profile",
        text2: err?.message || "Please try again",
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload) => AuthAPI.ChnagePassword(payload),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password changed successfully",
      });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to change password";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};
export const useCreateWithdrawRequest = () => {
  return useMutation({
    mutationFn: ({ amount, upiId }) =>
      WithdrawAPI.createWithdrawRequest(amount, upiId),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: data?.message || "Withdraw request created successfully",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    },
    onError: (error) => {
      console.log("Withdraw request error:", error);
      const message =
        error?.response?.data?.message || "Failed to create withdraw request";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message ,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: () => AuthAPI.logoutUser(),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Logged out successfully",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
     
      
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to log out";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
    },
  });
};
export const useCreateRazorpayOrder = () => {
  return useMutation({
    mutationFn: () => WithdrawAPI.createRazorpayOrder(),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Order Created',
        text2: 'Razorpay order created successfully',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    },
    onError: (error) => {
      console.log('Create order error:', error);
      const message =
        error?.response?.data?.message || 'Failed to create Razorpay order';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    },
  });
};
export const useVerifyRazorpayPayment = () => {
  return useMutation({
    mutationFn: (payload) => WithdrawAPI.verifyRazorpayPayment(payload),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Payment Verified',
        text2: data?.message || 'Payment verified successfully',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    },
    onError: (error) => {
      console.log('Verify payment error:', error);
      const message =
        error?.response?.data?.message || 'Payment verification failed';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    },
  });
};