import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>

    <StatusBar style="auto" backgroundColor="black" />
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(reports)" options={{ headerShown: false }} />

      </Stack>
      </SafeAreaView>
      
  
  );
}
