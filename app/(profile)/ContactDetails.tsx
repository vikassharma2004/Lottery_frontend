import React from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
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
     <SafeAreaView className="flex-1 bg-[#FFF5DB]">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🟢 HERO CARD */}
        <View className="mb-6">
            <View className="bg-[#3B82F6] border p-6 rounded-3xl ">
              <Text className="text-white text-xl font-bold mb-1">
                Welcome, {user.email.split("@")[0]}
              </Text>

              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Ionicons name="mail-outline" size={18} color="white" />
                  <Text className="text-white ml-2 text-sm">{user.email}</Text>
                </View>

                <View className="flex-row items-center bg-white/25 px-3 py-1 rounded-full">
                  <Ionicons name="wallet-outline" size={18} color="white" />
                  <Text className="text-white ml-2 font-semibold">
                    ₹{user.walletBalance || 0}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={18} color="white" />
                <Text className="text-white/90 ml-2 text-sm">
                  Joined {new Date(user.createdAt).toDateString()}
                </Text>
              </View>
            </View>
         
        </View>

        {/* 🧭 PERSONAL INFO */}
        <View className="bg-white rounded-2xl p-5 mb-5 shadow-lg border border-gray-400">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Personal Information
          </Text>

          <View className="flex-row items-center mb-3">
            <Ionicons name="mail-outline" size={20} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="text-gray-900 font-semibold">{user.email}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color={COLORS.PRIMARY} />
            <View className="ml-3">
              <Text className="text-gray-500 text-sm">Account Created</Text>
              <Text className="text-gray-900 font-semibold">
                {new Date(user.createdAt).toDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* 🎟 REFERRAL CARD */}
        <View className="bg-[#E8F5E9] rounded-2xl p-5 mb-5 shadow-sm border border-gray-400">
          <Text className="text-lg font-bold text-[#2E7D32] mb-4">
            Referral Info
          </Text>

          <View className="flex-row items-center mb-3">
            <FontAwesome5 name="award" size={18} color="#2E7D32" />
            <View className="ml-3">
              <Text className="text-[#33691E] text-sm">Referral Code</Text>
              <Text className="text-[#1B5E20] font-semibold">
                {user.referralCode || "Not available"}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="people-outline" size={20} color="#2E7D32" />
            <View className="ml-3">
              <Text className="text-[#33691E] text-sm">Referral Count</Text>
              <Text className="text-[#1B5E20] font-semibold">
                {user.referralCount || 0}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle-outline" size={20} color="#2E7D32" />
            <View className="ml-3">
              <Text className="text-[#33691E] text-sm">
                Successful Referrals
              </Text>
              <Text className="text-[#1B5E20] font-semibold">
                {user.successfulReferrals || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* 🛡 STATUS CARD */}
        <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-400">
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

          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={COLORS.PRIMARY}
              />
              <Text className="text-gray-800 ml-2">Status</Text>
            </View>
            <Text
              className={`font-bold ${
                user.isSuspended ? "text-red-500" : "text-green-600"
              }`}
            >
              {user.isSuspended ? "🚫 Suspended" : "🟢 Active"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name="time-outline"
                size={20}
                color={COLORS.PRIMARY}
              />
              <Text className="text-gray-800 ml-2">Last Payment</Text>
            </View>
            <Text className="font-semibold text-gray-700 text-sm">
              {user.lastPaymentDate || "—"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
