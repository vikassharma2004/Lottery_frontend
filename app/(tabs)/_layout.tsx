import React, { useMemo } from "react";
import { Tabs } from "expo-router";
import { adminTabs, userTabs } from "@/constants/tabs";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
export default function TabLayout() {
  // Replace with your actual auth context/state later
  const userRole: "user" | "admin" = "user";

  const tabs = useMemo(
    () => (userRole === "admin" ? adminTabs : userTabs),
    [userRole]
  );

  // Helper to check if tab should be visible
  const isVisible = (name: string): boolean =>
    tabs.some((tab) => tab.name === name);

  // Helper to get the icon for a tab
  const getIcon = (name: string) => {
    const tab = tabs.find((t) => t.name === name);
    return tab ? tab.icon : "alert"; // fallback icon
  };

  return (
    <>
      
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_SECONDARY,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND, // visible background
          position: "absolute",
          bottom: 5,
          left: 10,
          right: 10,
          height: 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderWidth: 0,
          elevation: 5, // for Android shadow
          shadowColor: COLORS.SHADOW, // iOS shadow
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 5,
        },
      }}
    >
      {/* User tabs */}
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          href: isVisible("Home") ? undefined : null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={getIcon("Home") as any} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ReferEarn"
        options={{
          title: "Refer",
          headerShown: false,
          href: isVisible("ReferEarn") ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={getIcon("ReferEarn") as any}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Admin tabs */}
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          href: isVisible("Dashboard") ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={getIcon("Dashboard") as any}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Users"
        options={{
          title: "Users",
          headerShown: false,
          href: isVisible("Users") ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={getIcon("Users") as any}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Payments"
        options={{
          title: "Payments",
          headerShown: false,
          href: isVisible("Payments") ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={getIcon("Payments") as any}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          href: isVisible("Profile") ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={getIcon("Profile") as any}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
        </>
  );
}
