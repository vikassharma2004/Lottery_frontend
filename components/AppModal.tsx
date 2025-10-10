import React from "react";
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import COLORS from "@/constants/Colors";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

export default function AppModal({
  visible,
  onClose,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: AppModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-2xl p-6 w-11/12">
              <Text className="text-xl font-bold text-gray-800 mb-4">{title}</Text>
              <Text className="text-gray-600 mb-6">{message}</Text>

              <View className="flex-row justify-end space-x-6 gap-5">
                <TouchableOpacity
                  className="bg-gray-200 px-4 py-2 rounded-xl"
                  onPress={onClose}
                >
                  <Text className="text-gray-800 font-semibold">{cancelText}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-[#FFB800] px-4 py-2 rounded-xl"
                  onPress={() => {
                    onConfirm && onConfirm();
                    onClose();
                  }}
                >
                  <Text className="text-black font-semibold">{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
