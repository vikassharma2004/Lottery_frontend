import React, { useState, useCallback, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Share,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PaymentModal from "@/components/PaymentModal";
import { useUserStore } from "@/store/AuthStore";
import Toast from "react-native-toast-message";
import RazorpayCheckout from "react-native-razorpay";
import { useCreateRazorpayOrder, useVerifyRazorpayPayment } from "@/hooks/Auth";
import { useFetchProfile } from "@/hooks/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReferEarn = () => {
  const router = useRouter();
  const { user, token, setUser } = useUserStore();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialized, setInitialized] = useState(false); // 🧠 new flag

  const createOrderMutation = useCreateRazorpayOrder();
  const verifyPaymentMutation = useVerifyRazorpayPayment();
  const { mutate: fetchProfile, isPending: profileLoading } = useFetchProfile();

  // 🔄 Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfile(undefined, {
      onSettled: () => setRefreshing(false),
    });
  }, [fetchProfile]);

  // ✅ Check auth only once after hydration
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = token || (await AsyncStorage.getItem("auth_token"));
      if (!storedToken) {
        router.replace("/Login");
      } else {
        setInitialized(true);
      }
    };
    checkAuth();
  }, []);

  // 🧠 Don’t render anything until auth check completes
  if (!initialized) return null;

  // 🧩 Also handle the no-user edge case
  if (!token || !user) {
    router.replace("/Login");
    return null;
  }


  const handleReferFriend = async () => {
    try {
      const message = `Join this app using my referral code: ${
        user?.referralCode || ""
      } and earn rewards!`;
      await Share.share({ message });
    } catch {
      Alert.alert("Error", "Unable to share referral code.");
    }
  };

  const handleMakePayment = () => setPaymentModalVisible(true);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const data = await createOrderMutation.mutateAsync();
      const { order, razorpayKeyId, prefill } = data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Spin The Wheel",
        description: "Pay to unlock referral rewards",
        prefill,
        theme: { color: "#F37254" },
        method: { upi: true, card: true, netbanking: false, wallet: false },
      };

      RazorpayCheckout.open(options)
        .then(async (response: any) => {
          const verifyResponse = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const verified = await verifyPaymentMutation.mutateAsync(verifyResponse);
          if (verified?.user) {
            setUser(verified.user);
          }
          setPaymentModalVisible(false);
        })
        .catch(() => setPaymentModalVisible(false))
        .finally(() => setLoading(false));
    } catch (err) {
      console.log("Payment error:", err);
      setPaymentModalVisible(false);
      setLoading(false);
    }
  };

  return (
   <SafeAreaView className="flex-1 bg-[#FFF8E7]">
  {/* Header */}
  <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
    <Text className="text-xl font-semibold text-[#212121]">Refer & Earn</Text>
    <TouchableOpacity
      className="flex-row items-center"
      onPress={() => router.push("/Wallet")}
    >
      <Text className="text-md text-[#212121] mr-1">My Bonus</Text>
      <Ionicons name="chevron-forward" size={16} color="gray" />
    </TouchableOpacity>
  </View>

  {/* 🟨 Trust Bar Section */}
  <View className="px-6 mt-4">
    <Text className="text-sm font-medium text-[#424242] mb-1">
      Trusted by <Text className="font-bold text-[#43A047]">1,276+</Text> users who’ve already joined!
    </Text>
    <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <View
        className="h-full bg-[#43A047]"
        style={{ width: "82%" }} // dynamic later from API
      />
    </View>
  </View>

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 10 }}
    refreshControl={
      <RefreshControl
        refreshing={refreshing || profileLoading}
        onRefresh={onRefresh}
        colors={["#FFB800"]}
        tintColor="#FFB800"
      />
    }
  >
    {/* Illustration */}
    <View className="items-center mt-6">
      <Image
        source={require("../../assets/images/Refer.png")}
        className="w-full h-64"
        resizeMode="contain"
      />
    </View>

    {/* 💬 Description */}
    <View className="px-6 mt-6 items-center">
      <Text className="text-lg font-semibold text-center text-[#212121] leading-6">
        Invite your friends and earn ₹100 for every successful referral!
      </Text>
      <Text className="text-sm text-center text-[#616161] mt-2">
        Every time your friend registers using your referral code and completes
        their payment, you’ll instantly get ₹100 added to your wallet.
      </Text>

      {user?.hasPaid ? (
        <View className="flex-row items-center justify-center mt-8 space-x-3">
          <View className="border border-dashed border-[#BDBDBD] rounded-lg px-8 py-3 bg-[#FFF5DB]">
            <Text className="text-2xl font-semibold tracking-widest text-[#212121]">
              {user?.referralCode}
            </Text>
          </View>
          <TouchableOpacity
            className="p-2"
            onPress={() => {
              Clipboard.setStringAsync(user?.referralCode || "");
              Toast.show({
                type: "info",
                text1: "Copied to clipboard",
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
    <View className="flex-row justify-around mt-14 px-6">
      <View className="items-center w-1/3">
        <Ionicons name="link-outline" size={22} color="#FFB800" />
        <Text className="text-xs mt-1 text-[#757575] text-center">Copy Code</Text>
      </View>
      <View className="items-center w-1/3">
        <Ionicons name="checkmark-circle-outline" size={22} color="#43A047" />
        <Text className="text-xs mt-1 text-[#757575] text-center">
          Friend Registers & Pays
        </Text>
      </View>
      <View className="items-center w-1/3">
        <Ionicons name="cash-outline" size={22} color="#3B82F6" />
        <Text className="text-xs mt-1 text-[#757575] text-center">
          Earn ₹100 Instantly
        </Text>
      </View>
    </View>

    {/* CTA */}
    <View className="mt-12 w-full px-6 mb-10">
      <TouchableOpacity
        className="bg-[#FFB800] py-3 rounded-full"
        onPress={user?.hasPaid ? handleReferFriend : handleMakePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#212121" />
        ) : (
          <Text className="text-[#212121] text-center text-base font-semibold">
            {user?.hasPaid ? "Refer a Friend" : "Make Payment to Unlock Referral"}
          </Text>
        )}
      </TouchableOpacity>

      {/* 🔹 Disclaimer */}
      <Text className="text-xs text-center text-[#9E9E9E] mt-3">
        Rewards are credited only after your friend completes payment.
      </Text>
    </View>
  </ScrollView>

  {/* Payment Modal */}
  <PaymentModal
    visible={paymentModalVisible}
    onClose={() => setPaymentModalVisible(false)}
    amount={500}
    title="Payment"
    description="Pay ₹500 to unlock your referral code and start earning rewards."
    onConfirm={handlePayment}
  />

  <Toast />
</SafeAreaView>

  );
};

export default ReferEarn;

const styles = StyleSheet.create({});
