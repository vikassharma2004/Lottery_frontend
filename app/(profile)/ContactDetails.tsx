import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store/AuthStore";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";

export default function ContactDetails() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading user details...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🧭 Top Card */}
        <View className=" rounded-2xl p-5 mb-6 shadow-md" style={{ backgroundColor: COLORS.BACKGROUND }}>
          <Text className="text-black text-xl font-bold mb-2">
            Welcome, {user.email.split("@")[0]}
          </Text>

          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="white" />
              <Text className="text-white ml-2">{user.email}</Text>
            </View>

            <View className="flex-row items-center bg-white/20 px-3 py-1 rounded-full">
              <Ionicons name="wallet-outline" size={18} color="white" />
              <Text className="text-white ml-2 font-semibold">
                ₹{user.walletBalance || 0}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={18} color="white" />
            <Text className="text-blue-100 ml-2 text-sm">
              Joined: {new Date(user.createdAt).toDateString()}
            </Text>
          </View>
        </View>

        {/* 👤 Personal Info */}
        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Personal Information
          </Text>

          <View className="flex-row items-center mb-3">
            <Ionicons name="mail-outline" size={20} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="text-gray-800 font-medium">{user.email}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Account Created</Text>
              <Text className="text-gray-800 font-medium">
                {new Date(user.createdAt).toDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* 🎟 Referral Info */}
        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Referral Info
          </Text>

          <View className="flex-row items-center mb-3">
            <FontAwesome5 name="award" size={18} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Referral Code</Text>
              <Text className="text-gray-800 font-medium">
                {user.referralCode || "Not available"}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="people-outline" size={20} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Referral Count</Text>
              <Text className="text-gray-800 font-medium">
                {user.referralCount || 0}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Successful Referrals</Text>
              <Text className="text-gray-800 font-medium">
                {user.successfulReferrals || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* 🛡 Account Status */}
        <View className="bg-white rounded-2xl p-5 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Account Status
          </Text>

          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-done-outline" size={20} color="green" />
              <Text className="text-gray-800 ml-2">Verified</Text>
            </View>
            <Text className="text-green-500 font-bold">
              {user.isVerified ? "✅" : "❌"}
            </Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center">
              <MaterialIcons name="paid" size={20} color="green" />
              <Text className="text-gray-800 ml-2">Paid</Text>
            </View>
            <Text className="text-green-500 font-bold">
              {user.hasPaid ? "💰" : "—"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.PRIMARY} />
              <Text className="text-gray-800 ml-2">Status</Text>
            </View>
            <Text
              className={`font-bold ${
                user.isSuspended ? "text-red-500" : "text-green-500"
              }`}
            >
              {user.isSuspended ? "🚫 Suspended" : "Active"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
