import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PaymentLineChart from "@/components/PaymentLineChart";
import PaymentPieChart from "@/components/PaymentBarChart";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/AuthStore";
import Toast from "react-native-toast-message";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useUserStore();

  // Check storage (optional)
  const logUserStorage = async () => {
    try {
      const json = await AsyncStorage.getItem("user-storage");
      console.log("Persisted user-storage:", JSON.parse(json));
    } catch (err) {
      console.error("Failed to read user-storage:", err);
    }
  };

  useEffect(() => {
    logUserStorage();

    // Redirect if not admin
    if (user && user.role !== "admin") {
      Toast.show({ type: "error", text1: "Unauthorized access" });
      router.replace("/Home"); // navigate to Home
    }
    if (!user) router.replace("/Login");
  }, [user]);

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text className="text-2xl mx-auto text-purple-500">Analysis</Text>
      </View>
      <View>
        <PaymentLineChart />
        <PaymentPieChart />
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
