import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/Colors";

const PaymentHistory = () => {
  const payments = [
    { id: "1", amount: 500, date: "2025-10-09T12:00:00Z", method: "UPI", status: "success" },
    { id: "2", amount: 250, date: "2025-10-08T15:30:00Z", method: "Card", status: "success" },
    { id: "3", amount: 100, date: "2025-10-07T09:20:00Z", method: "UPI", status: "pending" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Payment History</Text>

        {payments.map((payment) => (
          <View
            key={payment.id}
            className="bg-white rounded-xl p-4 mb-4 shadow-md"
          >
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-800 font-semibold">₹{payment.amount}</Text>
              <Text className="text-gray-500">{new Date(payment.date).toLocaleDateString()}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">{payment.method}</Text>
              <Text
                className={`font-semibold ${
                  payment.status === "success"
                    ? "text-green-600"
                    : payment.status === "pending"
                    ? "text-orange-500"
                    : "text-red-600"
                }`}
              >
                {payment.status.toUpperCase()}
              </Text>
            </View>
          </View>
        ))}

        <Text className="text-gray-700 mt-4">
          Total Payments: {payments.length}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentHistory;
