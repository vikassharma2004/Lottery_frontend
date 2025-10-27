import React, { useEffect, useState, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

import { settings } from "@/constants/data";
import AppModal from "@/components/AppModal";
import { useUserStore } from "../../store/AuthStore";
import { useLogout, useGetNotifications, useMarkAllAsRead } from "@/hooks/Auth";

interface SettingsItemProps {
  icon: string;
  title: string;
  navigate?: string;
  textStyle?: string;
  showArrow?: boolean;
  onPress?: () => void;
}

const SettingsItemRow = ({
  icon,
  title,
  navigate,
  textStyle = "",
  showArrow = true,
  onPress,
}: SettingsItemProps) => (
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
  const { user, token, hydrated, clearAuth } = useUserStore();
  const { mutate: logout } = useLogout();
  const { mutate: markAllAsRead } = useMarkAllAsRead();
  const { mutateAsync: getNotifications, isPending } = useGetNotifications();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // ✅ Fetch notifications only when modal opens
  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();
      if (data?.notifications) setNotifications(data.notifications);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  }, [getNotifications]);

  useEffect(() => {
    if (modalVisible) {
      fetchNotifications();
    }
  }, [modalVisible, fetchNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const currentUserRole = user?.role || "user";
  const filteredSettings = useMemo(
    () => settings.filter((item) => item.role === currentUserRole),
    [currentUserRole]
  );

  // ✅ Handle logout redirect safely
  useEffect(() => {
    if (!hydrated) return;
    if (!user || !token) {
      clearAuth();
      router.replace("/Login");
    }
  }, [user, token, hydrated, clearAuth, router]);

  if (!user || !token) return null;

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

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="notifications-outline" size={28} color="#212121" />
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  right: -2,
                  top: -2,
                  backgroundColor: "red",
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                }}
              />
            )}
          </TouchableOpacity>
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
              Hello,{" "}
              {user?.email
                ? user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)
                : "User"}
            </Text>
          </View>
        </View>

        {/* Role-based Settings */}
        <View className="flex flex-col mt-10 border-t pt-5 border-gray-200">
          {filteredSettings.map((item, index) => (
            <SettingsItemRow
              key={`${item.title}-${index}`}
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
            onPress={() => setLogoutModalVisible(true)}
          />
        </View>

        {/* Logout Modal */}
        <AppModal
          visible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          title="Logout"
          message="Are you sure you want to logout from the app?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={async () => {
            await clearAuth();
            await logout();
            setLogoutModalVisible(false);
          }}
        />

        {/* Notifications Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView className="flex-1 bg-[#FFF8E7]">
            {/* Header */}
            <View className="flex flex-row items-center justify-between px-5 py-4 border-b border-gray-300 bg-white shadow-sm">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="#212121" />
              </TouchableOpacity>

              <Text className="text-xl font-bold text-[#212121]">
                Notifications
              </Text>

              <TouchableOpacity
                onPress={() => {
                  markAllAsRead();
                  setNotifications((prev) =>
                    prev.map((n) => ({ ...n, read: true }))
                  );
                }}
              >
                <Text className="text-blue-600 font-semibold">
                  Mark all read
                </Text>
              </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <ScrollView className="flex-1 px-5 py-4">
              {isPending ? (
                <View className="flex-1 justify-center items-center mt-20">
                  <ActivityIndicator size="large" color="#212121" />
                </View>
              ) : notifications.length === 0 ? (
                <View className="flex-1 justify-center items-center mt-20">
                  <Ionicons
                    name="notifications-off-outline"
                    size={64}
                    color="#9E9E9E"
                  />
                  <Text className="text-gray-500 mt-3 text-base">
                    No notifications yet
                  </Text>
                </View>
              ) : (
                notifications.map((n) => {
                  const typeColors: Record<string, string> = {
                    payment: "#E8F5E9",
                    withdraw: "#FFF9C4",
                    ticket: "#E3F2FD",
                    referral: "#FCE4EC",
                    report: "#FFEBEE",
                    other: "#EEEEEE",
                  };

                  const borderColors: Record<string, string> = {
                    payment: "#81C784",
                    withdraw: "#FDD835",
                    ticket: "#64B5F6",
                    referral: "#F06292",
                    report: "#E57373",
                    other: "#9E9E9E",
                  };

                  const bgColor = typeColors[n.type] || typeColors.other;
                  const borderColor =
                    borderColors[n.type] || borderColors.other;

                  return (
                    <View
                      key={n._id || n.id}
                      className="rounded-2xl p-2 mb-3 shadow-md"
                      style={{
                        backgroundColor: bgColor,
                        borderLeftWidth: 5,
                        borderColor: borderColor,
                        opacity: n.read ? 0.7 : 1,
                      }}
                    >
                      <View className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-lg font-bold text-[#212121] capitalize">
                          {n.type}
                        </Text>
                        {!n.read && (
                          <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        )}
                      </View>

                      <Text className="text-[#424242] text-sm">
                        {n.message}
                      </Text>

                      <Text className="text-xs text-gray-600 mt-1">
                        {new Date().toLocaleDateString()}{" "}
                        {new Date().toLocaleTimeString()}
                      </Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
