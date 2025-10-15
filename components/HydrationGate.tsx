import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useUserStore } from "../store/AuthStore";

export const HydrationGate = ({ children }: { children: React.ReactNode }) => {
  const hydrated = useUserStore((state) => state.hydrated);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};
