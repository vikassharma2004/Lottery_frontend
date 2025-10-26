import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useCreateWithdrawRequest } from "@/hooks/Auth";

interface WithdrawRequestModalProps {
  visible: boolean;
  onClose: () => void;
  walletBalance: number;
}

export default function WithdrawRequestModal({
  visible,
  onClose,
  walletBalance,
}: WithdrawRequestModalProps) {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const { mutate: submitWithdraw, isPending } = useCreateWithdrawRequest();

 

  const handleSubmit = async() => {
    const amt = parseFloat(amount);
    if (!amount || !upiId) {
      Toast.show({ type: "error", text1: "Please fill all fields" });
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      Toast.show({ type: "error", text1: "Enter a valid amount" });
      return;
    }

    if (amt > walletBalance) {
      Toast.show({ type: "error", text1: "Amount exceeds wallet balance" });
      return;
    }

   // ✅ Use onSuccess in mutate to reset fields
  submitWithdraw(
    { amount: amt, upiId },
    {
      onSuccess: () => {
        setAmount("");
        setUpiId("");
        onClose(); // close modal
      },
    }
  );
};
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-2xl w-full p-5">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#2F3542]">
              Withdraw Funds
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#2F3542" />
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <Text className="text-gray-700 mb-1">Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            className="border border-gray-300 rounded-xl p-3 mb-4"
          />

          {/* UPI ID Input */}
          <Text className="text-gray-700 mb-1">UPI ID</Text>
          <TextInput
            value={upiId}
            onChangeText={setUpiId}
            placeholder="example@upi"
            className="border border-gray-300 rounded-xl p-3 mb-6"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className={`rounded-xl p-3 items-center ${
              isPending ? "bg-gray-400" : "bg-[#FFA502]"
            }`}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#2F3542" />
            ) : (
              <Text className="font-bold text-[#2F3542] text-lg">
                Submit Request
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
