import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProfileLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="black" />
      <Stack
        screenOptions={{
          headerShown: false, // ✅ show header
           
        }}
      >
        <Stack.Screen name="ContactDetails" options={{ title: "Contact Details" }} />
        <Stack.Screen name="Wallet" options={{ title: "Wallet"}} />
        <Stack.Screen name="ReportIssue" options={{ title: "Report Issue" }} />
        <Stack.Screen name="ChangePassword" options={{ title: "Change Password" }} />
        <Stack.Screen name="PaymentHistory" options={{ title: "Payment History" }} />
        <Stack.Screen name="Sessions" options={{ title: "Sessions" }} />
      </Stack>
    </>
  );
}
