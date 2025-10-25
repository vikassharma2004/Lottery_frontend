// app/(tabs)/Home.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../../store/AuthStore";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const features = [
  { id: 1, title: "Refer Friends", description: "Invite your friends and earn rewards for each successful referral.", icon: require("../../assets/images/Refer.png") },
  { id: 2, title: "Track Rewards", description: "Easily monitor your earnings and track your referrals in real-time.", icon: require("../../assets/images/Refer.png") },
  { id: 3, title: "Instant Payouts", description: "Get your rewards instantly through UPI, PayPal, or bank transfer.", icon: require("../../assets/images/Refer.png") },
  { id: 4, title: "24/7 Support", description: "Our support team is always ready to help you with any issues.", icon: require("../../assets/images/Support.png") },
];
/**
 * 
 * @returns  icon: require("../../assets/icons/refer.png") },
  { id: 2, title: "Track Rewards", description: "Easily monitor your earnings and track your referrals in real-time.", icon: require("../../assets/icons/track.png") },
  { id: 3, title: "Instant Payouts", description: "Get your rewards instantly through UPI, PayPal, or bank transfer.", icon: require("../../assets/icons/payout.png") },
  { id: 4, title: "24/7 Support", description: "Our support team is always ready to help you with any issues.", icon: require("../../assets/icons/support.png") },
 */

const Home = () => {
  const router = useRouter();
  const { user, token } = useUserStore();

  // 🚫 Redirect if user not logged in
  useEffect(() => {
    if (!token || !user) {
      Toast.show({
        type: "error",
        text1: "Access Denied",
        text2: "You need to log in to access the homepage.",
      });
      router.replace("/Login");
    }
  }, [token, user]);

  if (!token || !user) return null; // prevent rendering before redirect

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-yellow-100 via-yellow-50 to-white">
      <ScrollView className="px-5">
        {/* Hero Section */}
        <View className="my-5 items-center">
          <Image
            source={require("../../assets/images/Refer.png")}
            className="w-64 h-64"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-yellow-800 text-center mt-5">
            Earn Rewards by Referring Friends
          </Text>
          <Text className="text-center text-gray-700 mt-2">
            Invite your friends, complete tasks, and earn amazing rewards instantly!
          </Text>
          <TouchableOpacity
            className="mt-5 bg-yellow-500 px-8 py-3 rounded-full shadow-lg"
            onPress={() => router.push("/(tabs)/ReferEarn")}
          >
            <Text className="text-white font-bold text-lg">Refer Now</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View className="mt-10">
          <Text className="text-2xl font-bold text-yellow-700 mb-5">App Features</Text>
          {features.map((f) => (
            <View key={f.id} className="flex-row bg-white rounded-xl p-4 mb-4 shadow-md items-center">
              <Image source={require("../../assets/images/Support.png")} className="w-full" resizeMode="cover" />
              <View className="flex-1">
                <Text className="font-semibold text-lg text-gray-800">{f.title}</Text>
                <Text className="text-gray-600 text-sm mt-1">{f.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Support Section */}
        <View className="mt-10 mb-20">
          <Text className="text-2xl font-bold text-yellow-700 mb-5">We’ve Got You Covered</Text>
          <Text className="text-gray-700 text-base mb-3">
            Our dedicated support team is available 24/7 to help you with any queries or issues.
          </Text>
          <TouchableOpacity
            className="bg-yellow-500 px-6 py-3 rounded-full items-center shadow-md"
            onPress={() => router.push("/ReportIssue")}
          >
            <Text className="text-white font-bold">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Home;
