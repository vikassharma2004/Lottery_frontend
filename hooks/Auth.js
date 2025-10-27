// src/hooks/useLogin.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as AuthAPI from '../api/auth.api.js';
import * as WithdrawAPI from '../api/withdraw.api.js';
import { useUserStore } from '../store/AuthStore.js';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useState } from 'react';
export const useLogin = () => {
  const setAuth = useUserStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn:  (payload) => AuthAPI.loginUser(payload),

    onSuccess: async (res) => {
      

      if (res?.token && res?.user?.role !== "admin") {
        await AsyncStorage.setItem("auth_token", res.token);
        await setAuth(res.token, res.user);
        Toast.show({ type: "success", text1: "Login successful" });
        // router.replace("/Home"); // optional redirect
      } else {
        Toast.show({ type: "error", text1: "Admins cannot log in here" });
      }
    },

    onError: async (error) => {
      console.error("❌ Login error:", error.response?.data || error.message);
console.log("Login error full:", error);
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      // ✅ Detect “email not verified” and redirect to OTP verification
      if (message.toLowerCase().includes("email not verified")) {
        Toast.show({
          type: "info",
          text1: "Email not verified",
          text2: "Redirecting to OTP verification...",
        });

        // Small delay for user to read toast
        setTimeout(() => {
          router.push({
            pathname: "/OtpVerify",
            params: {
              email:error?.response?.data?.email, // backend may return this
              action: "verifyEmail",
            },
          });
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: message,
        });
      }
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
export const useFetchProfile = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async () => {
      const data = await AuthAPI.getProfile();
      return data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
        console.log("✅ Profile updated successfully:", data);
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, upiId }) =>
      WithdrawAPI.createWithdrawRequest(amount, upiId),

    onSuccess: async (data) => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Withdraw request sent successfully",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });

      // ✅ Force refetch of profile no matter what
      await queryClient.invalidateQueries({ queryKey: ["profile"], exact: true });
      await queryClient.refetchQueries({ queryKey: ["profile"], exact: true });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to create withdraw request";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
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
// 1️⃣ Send reset token
export const useSendResetToken = () => {
  return useMutation({
    mutationFn: (payload) => AuthAPI.sendResetToken(payload),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.message || 'Reset token sent successfully',
        position: 'top',
        visibilityTime: 3000,
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to send reset token';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 3000,
      });
    },
  });
};

// 2️⃣ Reset password with token
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, payload }) => resetPassword(token, payload),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.message || 'Password reset successfully',
        position: 'top',
        visibilityTime: 3000,
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to reset password';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 3000,
      });
    },
  });
};
// 🔹 Generate OTP Mutation
export const useGenerateOtp = () => {
  return useMutation({
    mutationFn: ({ email, type }) => AuthAPI.generateOtp({email, type}),
    onSuccess: (data) => {
      console.log("OTP generated:", data);
    Toast.show({ type: "success", text1: "OTP sent successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to send OTP. Please try again." });
    },
  });
};

// 🔹 Verify OTP Mutation
export const useVerifyOtp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ email, otp, type }) => AuthAPI.verifyOtp({ email, otp, type }),
    onSuccess: (data) => {
      Toast.show({ type: "success", text1: "OTP verified successfully" });
      setTimeout(() => {
        router.replace("/Login");
      }, 1000);
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error?.response?.data?.message || "OTP verification failed. Please try again." });

    },
  });
};
