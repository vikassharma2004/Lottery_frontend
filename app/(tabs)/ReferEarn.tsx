import React, { useState } from "react";
import * as Clipboard from 'expo-clipboard';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PaymentModal from "@/components/PaymentModal";
import { useUserStore } from "@/store/AuthStore";
import Toast from "react-native-toast-message";

const ReferEarn = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const handleReferFriend = async () => {
    try {
      const message = `Join this app using my referral code: ${user?.referralCode || ""} and earn rewards!`;
      await Share.share({ message });
    } catch {
      Alert.alert("Error", "Unable to share referral code.");
    }
  };

  const handleMakePayment = () => setPaymentModalVisible(true);

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <Text className="text-xl font-semibold text-[#212121]">
          Refer & Earn
        </Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.push("/Wallet")}
        >
          <Text className="text-md text-[#212121] mr-1">My Bonus</Text>
          <Ionicons name="chevron-forward" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View className="items-center mt-6">
        <Image
          source={require("../../assets/images/Refer.png")}
          className="w-full h-64"
          resizeMode="contain"
        />
      </View>

      {/* Description & Referral Code */}
      <View className="px-6 mt-6 items-center">
        <Text className="text-lg font-semibold text-center text-[#212121] leading-6">
          Refer your friends and earn ₹100 per person
        </Text>

        {user?.hasPaid ? (
          <View className="flex-row items-center justify-center mt-8 space-x-3">
            <View className="border border-dashed border-[#BDBDBD] rounded-lg px-8 py-3">
              <Text className="text-2xl font-semibold tracking-widest text-[#212121]">
                {user?.referralCode}
              </Text>
            </View>
            <TouchableOpacity
              className="p-2"
              onPress={() => {Clipboard.setStringAsync(user?.referralCode || '');
                Toast.show({
                  type: "info", // 'success', 'error', 'info'
                  text1: "Copied to clipboard", // main message
                });
              }}
            >
              <Ionicons name="copy-outline" size={24} color="#212121" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-base text-[#B00020] font-medium text-center mt-10">
            Complete your payment to unlock your referral code
          </Text>
        )}
      </View>

      {/* Steps */}
      <View className="flex-row justify-around mt-16 px-6">
        <View className="items-center w-1/3">
          <Ionicons name="link-outline" size={22} color="gray" />
          <Text className="text-xs mt-1 text-[#757575] text-center">
            Copy Code
          </Text>
        </View>
        <View className="items-center w-1/3">
          <Ionicons name="checkmark-circle-outline" size={22} color="gray" />
          <Text className="text-xs mt-1 text-[#757575] text-center">
            Registered & Paid
          </Text>
        </View>
        <View className="items-center w-1/3">
          <Ionicons name="cash-outline" size={22} color="gray" />
          <Text className="text-xs mt-1 text-[#757575] text-center">
            Earn Cash Rewards
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <View className="mt-12 w-full px-6">
        <TouchableOpacity
          className="bg-[#FFB800] py-3 rounded-full"
          onPress={user?.hasPaid ? handleReferFriend : handleMakePayment}
        >
          <Text className="text-[#212121] text-center text-base font-semibold">
            {user?.hasPaid ? "Refer Friend" : "Make Payment to Refer"}
          </Text>
        </TouchableOpacity>
      </View>

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        amount={500}
        title="Payment"
        description="Pay ₹500 to unlock your referral code and start earning rewards."
        onConfirm={() => {
          console.log("Payment confirmed");
          setPaymentModalVisible(false);
        }}
      />
      <Toast />
    </SafeAreaView>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({});
