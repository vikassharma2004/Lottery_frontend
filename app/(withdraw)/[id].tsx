import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const WithdrawDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Withdraw ID: {id}</Text>
    </View>
  );
};

export default WithdrawDetail;
