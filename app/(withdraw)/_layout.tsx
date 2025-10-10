import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ReportsLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="black" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Withdraw" />
      </Stack>
    </>
  );
}
