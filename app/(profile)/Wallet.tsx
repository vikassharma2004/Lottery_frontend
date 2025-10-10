import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // <- Router hook

export default function Wallet() {
  const router = useRouter(); // navigation handler
  const balance = 1250.75;
  const bonus = 100.0;

  return (
    <SafeAreaView className="flex-1 bg-[#fff8e749] p-4">
      {/* 🔹 Back Button & Breadcrumb */}
      <View className="flex-row items-center mb-4">
        {/* Back arrow */}
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Breadcrumb */}
        <Text className="ml-2 text-[#212121] text-lg font-semibold ">
          Profile / Wallet
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔹 Balance Card */}
        <View className="bg-black rounded-2xl p-5 mb-6 shadow-md">
          <Text className="text-gray-300 text-sm">Available Balance</Text>
          <Text className="text-white text-4xl font-bold mt-2">
            ₹{balance.toFixed(2)}
          </Text>

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-gray-400 text-sm">Bonus: ₹{bonus}</Text>

            <TouchableOpacity className="bg-[#FFB800] rounded-full px-5 py-2">
              <Text className="text-[#212121] font-semibold" >Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 💰 Bonus & Payment Info */}
        <View className="bg-gray-100 rounded-2xl p-4 mb-5">
          <Text className="text-lg font-semibold mb-3">Earning Breakdown</Text>

          <View className="flex-row justify-between items-center mb-5">
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={22} color="black" />
              <Text className="ml-2 text-gray-800">Referral Bonus</Text>
            </View>
            <Text className="text-green-600 font-medium">+ ₹100</Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <View className="flex-row items-center">
              <MaterialIcons name="payment" size={22} color="black" />
              <Text className="ml-2 text-gray-800">Payments from Users</Text>
            </View>
            <Text className="text-green-600 font-medium">+ ₹100</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="gift-outline" size={22} color="black" />
              <Text className="ml-2 text-gray-800">Special Bonuses</Text>
            </View>
            <Text className="text-green-600 font-medium">+ ₹50</Text>
          </View>
        </View>

        {/* 🧾 Transaction History */}
        <View className="bg-gray-100 rounded-2xl p-4">
          <Text className="text-lg font-semibold mb-3">Recent Transactions</Text>

          {[
            { id: 1, desc: "Withdrawal to UPI", amount: "-₹500", type: "debit" },
            { id: 2, desc: "Referral from Aayush", amount: "+₹100", type: "credit" },
            { id: 3, desc: "Payment from Sanya", amount: "+₹250", type: "credit" },
            { id: 4, desc: "Payment from Sanya", amount: "+₹250", type: "credit" },
            { id: 5, desc: "Payment from Sanya", amount: "+₹250", type: "credit" },
          ].map((tx) => (
            <View
              key={tx.id}
              className="flex-row justify-between py-3 border-b border-gray-300"
            >
              <Text className="text-gray-700">{tx.desc}</Text>
              <Text
                className={`${
                  tx.type === "credit" ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {tx.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
