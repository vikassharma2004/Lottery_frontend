import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
     <StatusBar style="dark" backgroundColor="black" />
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_SECONDARY,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND,
          position: "absolute",
          bottom: 5,
          left: 10,
          right: 10,
          height: 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 5,
          shadowColor: COLORS.SHADOW,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 5,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Refer & Earn */}
      <Tabs.Screen
        name="ReferEarn"
        options={{
          title: "Refer",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />

     

      {/* Profile */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
            </>
  );
}
