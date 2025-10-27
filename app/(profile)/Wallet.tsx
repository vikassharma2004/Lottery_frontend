import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/AuthStore";
import WithdrawRequestModal from "@/components/Withdraw.modal";
import { useFetchProfile } from "@/hooks/Auth";

const COLORS = {
  PRIMARY: "#4B7BEC",
  SUCCESS: "#2ED573",
  DANGER: "#FF6B6B",
  MUTED: "#A4B0BE",
  TEXT: "#2F3542",
};

export default function Wallet() {
  const router = useRouter();
  const { user } = useUserStore();
  const bonus = 100.0;
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { mutate: refreshProfile, isPending } = useFetchProfile();

  // 🔁 Pull-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    refreshProfile(undefined, {
      onSettled: () => setRefreshing(false),
    });
  };

  // Disable Withdraw button if no balance
  const isWithdrawDisabled = !user?.walletBalance || user.walletBalance <= 0;

  return (
    <SafeAreaView className="flex-1 bg-[#F5F6FA] p-4">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color={COLORS.TEXT} />
        </TouchableOpacity>
        <Text className="ml-2 text-lg font-semibold text-[#2F3542]">
          Wallet
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isPending}
            onRefresh={handleRefresh}
          />
        }
      >
        {/* Balance Card */}
        <View
          className="rounded-2xl p-5 mb-6 shadow-md"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          <Text className="text-white text-sm">Available Balance</Text>
          <Text className="text-white text-4xl font-bold mt-2">
            ₹{user?.walletBalance ?? 0}
          </Text>

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-[#2ED573] text-sm">Bonus: ₹{bonus}</Text>

            {/* Withdraw Button */}
            <TouchableOpacity
              className="rounded-full px-5 py-2"
              disabled={isWithdrawDisabled}
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: isWithdrawDisabled
                  ? COLORS.MUTED
                  : "#FFA502",
              }}
            >
              <Text
                className="font-semibold"
                style={{
                  color: isWithdrawDisabled ? "#CED6E0" : COLORS.TEXT,
                }}
              >
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Earning Breakdown */}
        <View
          className="rounded-2xl p-4 mb-5 shadow-md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Text className="text-lg font-semibold mb-3 text-[#2F3542]">
            Earning Breakdown
          </Text>

          <View className="flex-row justify-between items-center mb-5">
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={22} color="#2F3542" />
              <Text className="ml-2 text-[#2F3542]">Referral Bonus</Text>
            </View>
            <Text className="text-[#2ED573] font-medium">+ ₹100</Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <View className="flex-row items-center">
              <MaterialIcons name="payment" size={22} color="#2F3542" />
              <Text className="ml-2 text-[#2F3542]">Payments from Users</Text>
            </View>
            <Text className="text-[#2ED573] font-medium">+ ₹100</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="gift-outline" size={22} color="#2F3542" />
              <Text className="ml-2 text-[#2F3542]">Special Bonuses</Text>
            </View>
            <Text className="text-[#2ED573] font-medium">+ ₹50</Text>
          </View>
        </View>

        {/* Transaction History */}
        <View
          className="rounded-2xl p-4 shadow-md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Text className="text-lg font-semibold mb-3 text-[#2F3542]">
            Recent Transactions
          </Text>

          {[
            { id: 1, desc: "Withdrawal to UPI", amount: "-₹500", type: "debit" },
            { id: 2, desc: "Referral from Aayush", amount: "+₹100", type: "credit" },
            { id: 3, desc: "Payment from Sanya", amount: "+₹250", type: "credit" },
          ].map((tx) => (
            <View
              key={tx.id}
              className="flex-row justify-between py-3 border-b border-gray-200"
            >
              <Text className="text-[#2F3542]">{tx.desc}</Text>
              <Text
                style={{
                  color: tx.type === "credit" ? COLORS.SUCCESS : COLORS.DANGER,
                  fontWeight: "600",
                }}
              >
                {tx.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Withdraw Modal */}
        <WithdrawRequestModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            handleRefresh(); // ✅ Refresh profile on modal close
          }}
          walletBalance={user?.walletBalance ?? 0}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
