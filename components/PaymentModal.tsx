import React from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  amount?: number;
  title?: string;
  description?: string;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  amount = 500,
  title = "Complete Your Payment",
  description = "Pay now to unlock exclusive referral rewards and benefits.",
  onConfirm,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View className="flex-1 bg-black/50 justify-end">
        <View
          className="bg-white rounded-t-3xl p-6"
          style={{ height: height * 0.85 }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-900">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={28} color="#212121" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center text-gray-600 text-base mb-6">
              {description}
            </Text>

            {/* Amount Card */}
            <View className="bg-yellow-100 rounded-2xl p-6 w-full items-center shadow-md">
              <Text className="text-gray-600 text-sm mb-2">Amount</Text>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                ₹{amount.toFixed(2)}
              </Text>
              <Text className="text-gray-500 text-center text-sm">
                Unlock referral benefits after payment.
              </Text>
            </View>

            {/* Benefits */}
            <View className="w-full mt-6">
              <Text className="text-gray-900 font-semibold mb-3 text-lg">
                Referral Benefits:
              </Text>
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="emoji-events" size={20} color="#FFB800" />
                <Text className="ml-2 text-gray-700 text-sm">Exclusive rewards</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="group" size={20} color="#FFB800" />
                <Text className="ml-2 text-gray-700 text-sm">Invite friends and earn</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="stars" size={20} color="#FFB800" />
                <Text className="ml-2 text-gray-700 text-sm">Priority support</Text>
              </View>
            </View>
          </View>

          {/* Footer Buttons */}
          <View className="mt-6 space-y-4">
            <TouchableOpacity
              className="bg-yellow-500 py-3 mb-4 rounded-full"
              onPress={onConfirm}
            >
              <Text className="text-gray-900 text-center font-semibold text-lg">
                Pay Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-gray-300 py-3 rounded-full"
              onPress={onClose}
            >
              <Text className="text-gray-700 text-center font-medium text-lg">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
