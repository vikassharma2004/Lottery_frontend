import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Users = () => {
  const [activeTab, setActiveTab] = useState("Paid");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const usersData = [
    {
      id: "1",
      name: "Anna Chen",
      email: "anna@example.com",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      verified: true,
      isSuspended: false,
      paid: true,
    },
    {
      id: "2",
      name: "David Smith",
      email: "david@example.com",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      verified: false,
      isSuspended: false,
      paid: false,
    },
    {
      id: "3",
      name: "Olivia Jones",
      email: "olivia@example.com",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      verified: true,
      isSuspended: true,
      paid: true,
    },
    ...Array.from({ length: 30 }).map((_, i) => ({
      id: `${i + 4}`,
      name: `User ${i + 4}`,
      email: `user${i + 4}@example.com`,
      avatar: `https://randomuser.me/api/portraits/${
        i % 2 === 0 ? "men" : "women"
      }/${i + 40}.jpg`,
      verified: i % 2 === 0,
      isSuspended: i % 7 === 0,
      paid: i % 3 === 0,
    })),
  ];

  const filtered = usersData.filter(
    (u) =>
      u.paid === (activeTab === "Paid") &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const pageSize = 10;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);
  const totalActiveUsers = usersData.filter((u) => u.paid).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      {/* HEADER SECTION */}
      <View className="mt-4 mb-6 items-center">
        <Text className="text-2xl font-bold text-gray-800">User Management</Text>
        <Text className="text-gray-500 mt-1 text-sm">
          Overview of registered and active users
        </Text>

        <View className="flex-row items-center mt-4 space-x-2">
          <Text className="text-5xl font-extrabold text-indigo-600">
            {totalActiveUsers}
          </Text>
          <Ionicons name="arrow-up-outline" size={26} color="#22c55e" />
        </View>
        <Text className="text-gray-500 font-medium mt-1">
          Active Paid Users
        </Text>
      </View>

      {/* SEARCH BAR */}
      <View className="flex-row items-center bg-white rounded-full px-3 py-2 mb-4 shadow border border-gray-200">
        <Ionicons name="search" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search by name or email..."
          value={search}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-gray-700 text-sm"
        />
      </View>

      {/* FILTER TABS */}
      <View className="flex-row justify-around mb-5">
        {["Paid", "Unpaid"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`flex-1 mx-1 py-3 rounded-2xl ${
              activeTab === tab ? "bg-indigo-600" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === tab ? "text-white" : "text-gray-700"
              }`}
            >
              {tab} Users
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* USER LIST */}
      <FlatList
        data={paginated}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white mb-3 p-4 rounded-2xl shadow-sm border border-gray-100">
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />

            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">
                {item.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-gray-600 text-sm mr-1">{item.email}</Text>
                {item.verified ? (
                  <Ionicons name="checkmark-circle" size={16} color="green" />
                ) : (
                  <Ionicons name="close-circle" size={16} color="red" />
                )}
              </View>
            </View>

            <View className="items-end">
              {item.isSuspended ? (
                <Text className="text-xs text-red-500 font-semibold mb-1">
                  Suspended
                </Text>
              ) : (
                <Text className="text-xs text-green-500 font-semibold mb-1">
                  Active
                </Text>
              )}
              <AntDesign name="arrow-right" size={16} color="#6B7280" />
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
              disabled={page === 1}
              onPress={() => setPage(page - 1)}
              className={`px-5 py-2 rounded-xl ${
                page === 1 ? "bg-gray-300" : "bg-indigo-600"
              }`}
            >
              <Text
                className={`font-semibold ${
                  page === 1 ? "text-gray-500" : "text-white"
                }`}
              >
                Prev
              </Text>
            </TouchableOpacity>

            <Text className="font-medium text-gray-700">
              Page {page} / {totalPages || 1}
            </Text>

            <TouchableOpacity
              disabled={page >= totalPages}
              onPress={() => setPage(page + 1)}
              className={`px-5 py-2 rounded-xl ${
                page >= totalPages ? "bg-gray-300" : "bg-indigo-600"
              }`}
            >
              <Text
                className={`font-semibold ${
                  page >= totalPages ? "text-gray-500" : "text-white"
                }`}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Users;
