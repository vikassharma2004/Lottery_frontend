import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // 👈 import createJSONStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthAPI from '../api/auth.api';
import Toast from 'react-native-toast-message';

export const useUserStore = create(
    persist(
        (set, get) => ({
            // --- state ---
            user: null,
            token: null,
            loading: false,
            error: null,
            message: null,
            hydrated: false,          // ✅ new
            setHydrated: () => set({ hydrated: true }), // ✅ new
            setUser: (user) => set({ user }),
            // --- helpers ---
            setAuth: async (token, user = null) => {

                try {
                    if (token) await AsyncStorage.setItem('auth_token', token);
                    else await AsyncStorage.removeItem('auth_token');
                } catch {
                    console.log('Failed to set auth token');
                } finally {
                    set({ token, user });
                }
            },
            // --- setLoading ---
            setLoading: (loading) => {
                try {
                    set({ loading: loading });
                } finally {
                    set({ loading });
                }
            },
            clearAuth: async () => {
                try {
                    // clear persisted storage
                    await AsyncStorage.removeItem('auth_token');
                    await AsyncStorage.removeItem('user-storage'); // clear Zustand persist storage
                } catch (err) {
                    console.error('Failed to clear auth storage', err);
                } finally {
                    // clear Zustand store
                    set({ token: null, user: null, loading: false, error: null, message: null });
                }
            },
            restoreSession: async () => {
                set({ loading: true, error: null });
                try {
                    const token = await AsyncStorage.getItem('auth_token');
                    if (!token) {
                        set({ loading: false });
                        return;
                    }

                    set({ token });
                    // 🔍 Check if token still valid
                    const verify = await AuthAPI.verifyToken();

                    if (verify.valid) {
                        // Token valid → fetch profile
                        const profileRes = await AuthAPI.getProfile();
                        console.log("profileres", profileRes);
                        set({ user: profileRes.user || profileRes.data || profileRes });
                    } else {
                        // Token expired → nuke session
                        await AsyncStorage.removeItem('auth_token');
                        set({ token: null, user: null, error: 'Session expired. Please log in again.' });
                    }
                } catch (err) {
                    await AsyncStorage.removeItem('auth_token');
                    set({ token: null, user: null, error: 'Session invalid or expired.' });
                } finally {
                    set({ loading: false });
                }
            },

            // 🔍 manual token check
            verifyToken: async () => {
                try {
                    const res = await AuthAPI.verifyToken();
                    
                    return res.valid || false;
                } catch {
                    return false;
                }
            },


            register: async (payload) => {
                set({ loading: true, error: null, message: null });
                try {
                    const res = await AuthAPI.registerUser(payload);
                    set({ message: res.message || 'Registration successful' });
                    Toast.show({ type: 'success', text1: 'Registration successful' });
                    return true;
                } catch (err) {
                    set({ error: err.message || 'Registration failed' });
                    Toast.show({ type: 'error', text1: 'Registration failed', text2: err.message || 'Registration failed' });
                    return false;

                } finally {
                    set({ loading: false });
                }
            },

            login: async ({ email, password }) => {
              
                set({ loading: true, error: null, message: null });
                try {
                    const res = await AuthAPI.loginUser({ email, password });
                    if (res.token && res.user?.role!="admin") await get().setAuth(res.token, res.user || null);
                    Toast.show({ type: 'success', text1: 'Login successful' });
                    return res;
                } catch (err) {
                    Toast.show({ type: 'error', text1: 'Login failed', text2: err.message || 'Invalid credentials' });
                    // Return the error object so caller can act
                    return { error: true, message: err.message };
                } finally {
                    set({ loading: false });
                }
            },

            getProfile: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await AuthAPI.getProfile();
                    set({
                        user: res.user
                    });
                } catch (err) {
                    set({ error: err.message || 'Failed to fetch profile' });
                } finally {
                    set({ loading: false });
                }
            },

            logout: async () => {
                set({ loading: true, error: null, message: null });
                try {
                    await AuthAPI.logoutUser();
                    await get().clearAuth();
                    Toast.show({ type: 'success', text1: 'Logged out successfully' });
                } catch (err) {
                    Toast.show({ type: 'error', text1: 'Logout failed', text2: err.message || 'Failed to logout' });
                } finally {

                    await get().setAuth(null, null);
                    set({ message: 'Logged out', loading: false });
                }
            },

            sendResetToken: async (payload) => {
                set({ loading: true, error: null, message: null });
                try {
                    const res = await AuthAPI.sendResetToken(payload);
                    set({ message: res.message || 'Reset token sent' });
                } catch (err) {
                    set({ error: err.message || 'Failed to send reset token' });
                } finally {
                    set({ loading: false });
                }
            },

            resetPassword: async (token, payload) => {
                set({ loading: true, error: null, message: null });
                try {
                    const res = await AuthAPI.resetPassword(token, payload);
                    set({ message: res.message || 'Password reset successful' });
                } catch (err) {
                    set({ error: err.message || 'Failed to reset password' });
                } finally {
                    set({ loading: false });
                }
            },
            // --- OTP ---
            generateOtp: async (email,type) => {
                console.log("generateOtp called with", email);
                set({ loading: true, error: null });
                try {
                    const res = await AuthAPI.generateOtp({ email,type });
                    console.log("OTP generated:", res);
                    Toast.show({ type: "success", text1: "OTP sent" });
                    return res;
                } catch (err) {
                    Toast.show({
                        type: "error",
                        text1: "Failed to send OTP",
                        text2: err.message,
                    });
                    return null;
                } finally {
                    set({ loading: false });
                }
            },

            verifyOtp: async ( email, otp ) => {
                console.log("verifyOtp called with", email, otp);
                set({ loading: true, error: null });
                try {
                    const res = await AuthAPI.verifyOtp({ email, otp });
                    console.log("OTP verified:", res);
                    Toast.show({ type: "success", text1: "OTP verified" });
                    return res;
                } catch (err) {
                    Toast.show({
                        type: "error",
                        text1: "OTP verification failed",
                        text2: err.message,
                    });
                    return null;
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage), // ✅ FIXED LINE
            onRehydrateStorage: () => (state) => {
                state?.setHydrated?.(); // flip hydrated flag when store finishes restoring
            },
        }
    )
);
