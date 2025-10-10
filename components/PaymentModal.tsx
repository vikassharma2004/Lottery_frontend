import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";

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
  title = "Payment",
  description = "Proceed with payment to unlock referral benefits.",
  onConfirm,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View className="flex-1 bg-black/50 justify-end">
        {/* Modal content */}
        <View
          className="bg-white rounded-t-3xl p-6"
          style={{ height: height * 0.85 }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-[#212121]">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={28} color="#212121" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-gray-700 text-center text-base mb-4">
              {description}
            </Text>

            <View className="bg-[#FFF8E7] rounded-2xl p-6 w-full items-center shadow-md">
              <Text className="text-gray-600 text-sm mb-2">Amount</Text>
              <Text className="text-3xl font-bold text-[#212121] mb-2">
                ₹{amount.toFixed(2)}
              </Text>
              <Text className="text-gray-500 text-center text-sm">
                You will unlock referral benefits after payment.
              </Text>
            </View>
          </View>

          {/* Footer Buttons */}
          <View className="mt-6 space-y-4">
            <TouchableOpacity
              className="bg-[#FFB800] py-3 rounded-full"
              onPress={onConfirm}
            >
              <Text className="text-[#212121] text-center font-semibold text-lg">
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

const styles = StyleSheet.create({});
