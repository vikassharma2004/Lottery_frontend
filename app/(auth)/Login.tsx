import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  const links = [
    { label: "Go to Home", href: "/ReferEarn" },
    { label: "Contact", href: "/ContactDetails" },
    { label: "All Reports", href: "/Reports" },
    { label: "Report #3", href: "/reports/3" },
    { label: "Withdraw", href: "/(withdraw)" },
    { label: "otp", href: "/OtpVerify" },
    { label: "otp", href: "/ResetPassword" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white px-8 pt-10">
      <View>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Hello 👋</Text>

        {links.map((link, index) => (
          <Link key={index} href={link.href} asChild>
            <TouchableOpacity className="bg-blue-500 py-3 rounded-2xl mb-3 active:bg-blue-600">
              <Text className="text-center text-white text-base font-semibold">
                {link.label}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}

        {/* 👉 Move to withdraw/:id dynamically */}
        <TouchableOpacity
          onPress={() => router.push("/(withdraw)/5")}
          className="bg-green-500 py-3 rounded-2xl mb-3 active:bg-green-600"
        >
          <Text className="text-center text-white text-base font-semibold">
            Go to Withdraw ID #3
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
