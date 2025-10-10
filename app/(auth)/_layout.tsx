import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="black" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="OtpVerify" />
        <Stack.Screen name="ResetPassword" />
      </Stack>
    </>
  );
}
