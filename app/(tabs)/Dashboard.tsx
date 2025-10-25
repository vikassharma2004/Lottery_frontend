import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/AuthStore";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  LineChart,
  BarChart,
  PieChart,
} from "react-native-chart-kit";

const { width } = Dimensions.get("window");

const Dashboard = () => {
  const router = useRouter();
  const { user } = useUserStore();

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

    if (user && user.role !== "admin") {
      Toast.show({ type: "error", text1: "Unauthorized access" });
      router.replace("/Home");
    }
    if (!user) router.replace("/Login");
  }, [user]);

  // Dummy Analytics Data
  const metrics = [
    {
      icon: "cash-outline",
      label: "Total Payments",
      value: "1,240",
      color: "#4F46E5",
    },
    {
      icon: "card-outline",
      label: "Withdrawals",
      value: "342",
      color: "#10B981",
    },
    {
      icon: "document-text-outline",
      label: "Reports",
      value: "27",
      color: "#F59E0B",
    },
    {
      icon: "people-outline",
      label: "Active Users",
      value: "879",
      color: "#EF4444",
    },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [150, 230, 180, 300, 280, 360],
        color: () => "#6366F1",
        strokeWidth: 3,
      },
    ],
  };

  const barData = {
    labels: ["Payments", "Withdraws", "Reports", "Users"],
    datasets: [
      {
        data: [1240, 342, 27, 879],
      },
    ],
  };

  const pieData = [
    {
      name: "Payments",
      population: 1240,
      color: "#4F46E5",
      legendFontColor: "#333",
      legendFontSize: 13,
    },
    {
      name: "Withdrawals",
      population: 342,
      color: "#10B981",
      legendFontColor: "#333",
      legendFontSize: 13,
    },
    {
      name: "Reports",
      population: 27,
      color: "#F59E0B",
      legendFontColor: "#333",
      legendFontSize: 13,
    },
    {
      name: "Active Users",
      population: 879,
      color: "#EF4444",
      legendFontColor: "#333",
      legendFontSize: 13,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInUp.delay(100).springify()}
          className="px-5 py-4 flex-row items-center justify-between bg-white shadow-sm rounded-b-2xl"
        >
          <View>
            <Text className="text-xl font-bold text-gray-800">
              Admin Dashboard
            </Text>
            <Text className="text-gray-500">
              Welcome, {user?.email?.split("@")[0] || "Admin"}
            </Text>
          </View>
          <View className="bg-purple-100 px-4 py-1.5 rounded-full">
            <Text className="text-purple-600 font-semibold capitalize">
              {user?.role}
            </Text>
          </View>
        </Animated.View>

        {/* Stats */}
        <View className="px-5 mt-6 flex-row flex-wrap justify-between">
          {metrics.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(150 + index * 100).springify()}
              className="bg-white w-[48%] rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-center mb-2">
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text className="ml-2 text-gray-500">{item.label}</Text>
              </View>
              <Text
                className="text-2xl font-bold"
                style={{ color: item.color }}
              >
                {item.value}
              </Text>
            </Animated.View>
          ))}
        </View>

        {/* Charts Section */}
        <Animated.View
          entering={FadeInUp.delay(600).springify()}
          className="mt-4 px-5"
        >
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Monthly Payment Trend
          </Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <LineChart
              data={lineData}
              width={width - 60}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
                labelColor: () => "#6B7280",
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#4F46E5",
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </View>

          <Text className="text-lg font-bold text-gray-800 mb-3">
            Category Summary
          </Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <BarChart
              data={barData}
              width={width - 60}
              height={220}
              fromZero
              showValuesOnTopOfBars
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
                labelColor: () => "#6B7280",
                fillShadowGradient: "#6366F1",
                fillShadowGradientOpacity: 1,
                barPercentage: 0.6,
              }}
              style={{
                borderRadius: 16,
              }}
            />
          </View>

          <Text className="text-lg font-bold text-gray-800 mb-3">
            Overall Distribution
          </Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 items-center">
            <PieChart
              data={pieData}
              width={width - 60}
              height={200}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              absolute
            />
          </View>
        </Animated.View>
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

export default Dashboard;

