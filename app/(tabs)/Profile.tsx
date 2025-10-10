import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { settings } from "@/constants/data";
import { SettingItem } from "@/types/constant.types";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppModal from "@/components/AppModal";
// Example: replace this with role from auth/user context
const currentUserRole: "user" | "admin" = "user";

interface SettingsItemProps {
  icon: string;
  title: string;
  navigate?: string; // path to navigate
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItemRow = ({
  icon,
  title,
  navigate,
  textStyle = "",
  showArrow = true,
  onPress,
}: SettingsItemProps & { onPress?: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Ionicons name={icon as any} size={22} color="#212121" />
      <Text className={`text-lg font-rubik-medium text-[#212121] ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && (
      <Ionicons name="chevron-forward-outline" size={18} color="#9E9E9E" />
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Filter settings based on current user role
  const filteredSettings: SettingItem[] = settings.filter(
    (item) => item.role === currentUserRole
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold text-[#212121]">
            Profile
          </Text>
          <Ionicons name="notifications-outline" size={22} color="#212121" />
        </View>

        {/* Avatar */}
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={require("../../assets/images/avatar.png")}
              className="w-44 h-44 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2 bg-[#FFF8E7] rounded-full p-1 shadow">
              <MaterialIcons name="verified" size={25} color="green" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2 text-[#212121]">
              John Doe
            </Text>
          </View>
        </View>

        {/* Role-based Settings */}
        <View className="flex flex-col mt-10 border-t pt-5 border-gray-200">
          {filteredSettings.map((item, index) => (
            <SettingsItemRow
              key={index}
              icon={item.icon}
              title={item.title}
              navigate={item.navigate}
              onPress={() => item.navigate && router.push(item.navigate)}
            />
          ))}
        </View>

        {/* Logout */}
        <View className="flex flex-col border-t mt-5 pt-5 border-gray-200">
          <SettingsItemRow
            icon="log-out-outline"
            title="Logout"
            textStyle="text-[#E53935]"
            showArrow={false}
            onPress={() => setLogoutModalVisible(true)} // open modal// replace with logout logic
          />
        </View>
        <AppModal
          visible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          title="Logout"
          message="Are you sure you want to logout from the app?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={() => {
            console.log("User logged out");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
