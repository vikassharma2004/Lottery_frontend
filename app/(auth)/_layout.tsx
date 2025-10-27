
import { toastConfig } from "@/components/ToastConfig";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="black" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="OtpVerify" />
        <Stack.Screen name="ResetPassword" />
      </Stack>
      <Toast/>
    </>
  );
}
