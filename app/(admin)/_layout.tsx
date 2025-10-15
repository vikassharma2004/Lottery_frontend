import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function WithdrawLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="black" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sessions" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
