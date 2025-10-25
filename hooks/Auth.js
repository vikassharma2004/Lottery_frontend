// src/hooks/useLogin.js
import { useMutation, useQuery } from '@tanstack/react-query';
import * as AuthAPI from '../api/auth.api.js';
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
