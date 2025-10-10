import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactDetails() {
  // Dummy user data
  const user = {
    id: "123456",
    email: "user@example.com",
    phone: "+91 9876543210",
    role: "User",
    referredBy: "REF123",
    isVerified: true,
    payment: true,
    referralCode: "XYZ789",
    walletBalance: 1250.75,
    ticket: 3,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Contact Details
        </Text>

        <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
          <Text className="text-gray-600 mb-1">User ID</Text>
          <Text className="text-gray-800 font-semibold mb-3">{user.id}</Text>

          <Text className="text-gray-600 mb-1">Email</Text>
          <Text className="text-gray-800 font-semibold mb-3">{user.email}</Text>

          <Text className="text-gray-600 mb-1">Phone</Text>
          <Text className="text-gray-800 font-semibold mb-3">{user.phone}</Text>

          <Text className="text-gray-600 mb-1">Role</Text>
          <Text className="text-gray-800 font-semibold mb-3">{user.role}</Text>

          <Text className="text-gray-600 mb-1">Referred By</Text>
          <Text className="text-gray-800 font-semibold mb-3">
            {user.referredBy || "N/A"}
          </Text>

          <Text className="text-gray-600 mb-1">Verified</Text>
          <Text className="text-gray-800 font-semibold mb-3">
            {user.isVerified ? "Yes" : "No"}
          </Text>

          <Text className="text-gray-600 mb-1">Payment Status</Text>
          <Text className="text-gray-800 font-semibold mb-3">
            {user.payment ? "Paid" : "Not Paid"}
          </Text>

          <Text className="text-gray-600 mb-1">Referral Code</Text>
          <Text className="text-gray-800 font-semibold mb-3">
            {user.referralCode}
          </Text>

          <Text className="text-gray-600 mb-1">Wallet Balance</Text>
          <Text className="text-gray-800 font-semibold mb-3">
            ₹{user.walletBalance.toFixed(2)}
          </Text>

          <Text className="text-gray-600 mb-1">Tickets</Text>
          <Text className="text-gray-800 font-semibold">{user.ticket}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
