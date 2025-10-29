import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
const FAQ_DATA = [
  {
    question: "Why is my account suspended?",
    answer:
      "Your account may be suspended due to policy violations, multiple failed verification attempts, or suspicious activity. Contact support for clarification or reinstatement.",
  },
  {
    question: "How much time does it take for withdrawal?",
    answer:
      "Withdrawals typically take 1–3 business days to reflect in your bank account, depending on your payment provider and transaction volume.",
  },
  {
    question: "How to withdraw?",
    answer:
      "Go to your Wallet section, tap on 'Withdraw', enter the desired amount, and confirm your request. Ensure your bank details are verified before initiating withdrawal.",
  },
  {
    question: "How to update profile details?",
    answer:
      "Profile updates are currently restricted as per our rules and regulations. If you need to correct critical information, please contact support for manual verification and assistance.",
  },
  {
    question: "What to do if my withdrawal UPI ID is filled incorrectly?",
    answer:
      "Report an issue immediately with the incorrect UPI ID. Our team will review and attempt to cancel the withdrawal if it hasn’t been processed yet. Once the payment is processed, we won’t be able to reverse or recover the amount, so act as soon as possible.",
  },
  {
    question: "How much amount will I get per referral?",
    answer:
      "You will receive ₹100 in your wallet for every successful referral — once the person you referred completes a successful payment. Make sure they use your referral code during signup.",
  },
  {
    question: "Where can I report an issue?",
    answer:
      "You can report any issue directly from the 'Profile' section inside the app. If you're unable to log in, there's also a 'Report Issue' option available on the Login screen to help you contact support easily.",
  },
];

export default function FaqScreen() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text className="text-2xl font-bold text-center text-blue-800 mt-6 mb-4">
          Frequently Asked Questions
        </Text>

        {FAQ_DATA.map((item, index) => (
          <View
            key={index}
            className="bg-blue-50 rounded-2xl mb-3 overflow-hidden"
          >
            <TouchableOpacity
              onPress={() => toggleQuestion(index)}
              activeOpacity={0.8}
              className="flex-row justify-between items-center p-4"
            >
              <Text className="text-base font-semibold text-gray-800 flex-1 pr-2">
                {item.question}
              </Text>
              <MaterialIcons
                name={openIndex === index ? "expand-less" : "expand-more"}
                size={26}
                color="#2563EB"
              />
            </TouchableOpacity>

            {openIndex === index && (
              <Animated.View
                entering={FadeInDown.duration(200)}
                exiting={FadeOutUp.duration(150)}
                className="px-4 pb-4"
              >
                <Text className="text-gray-700 text-[15px] leading-6">
                  {item.answer}
                </Text>
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
