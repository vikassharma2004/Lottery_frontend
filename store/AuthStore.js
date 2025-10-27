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
                      set({ token: null, user: null, loading: false, error: null, message: null });
                } catch (err) {
                    console.error('Failed to clear auth storage', err);
                } finally {
                    // clear Zustand store
                    set({ token: null, user: null, loading: false, error: null, message: null });
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
