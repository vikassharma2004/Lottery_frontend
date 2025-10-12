import { Ionicons } from "@expo/vector-icons";
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
import AntDesign from "@expo/vector-icons/AntDesign";

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

  // FILTER BY TAB AND SEARCH
  const filtered = usersData.filter(
    (u) =>
      u.paid === (activeTab === "Paid") &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  // PAGINATION LOGIC
  const pageSize = 11;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const totalActiveUsers = usersData.filter((u) => u.paid).length;

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E7] px-5">
      {/* HEADER */}
      <View className="items-center mt-2 mb-3">
        <Text className="text-lg font-semibold text-green-600 tracking-widest uppercase">
          LIVE Customers
        </Text>

        <View className="flex-row items-center mt-2 space-x-6">
          <Text className="text-6xl font-bold text-gray-900">{totalActiveUsers}</Text>
          <Ionicons name="arrow-up-outline" size={24} color="#22c55e" />
        </View>

        <Text className="text-gray-600 font-medium mt-1">
          Active Paid Users
        </Text>
      </View>

      {/* SEARCH BAR */}
      <View className="flex-row items-center bg-white rounded-full px-3 py-2 mb-4 shadow-sm border border-[#BDBDBD]">
        <Ionicons name="search" size={18} color="#BDBDBD" />
        <TextInput
          placeholder="Search user..."
          value={search}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-gray-800"
        />
      </View>

      {/* TABS */}
      <View className="flex-row justify-around mb-3">
        {["Paid", "Unpaid"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`px-10 py-3 rounded-full ${
              activeTab === tab ? "bg-[#FFB800]" : "bg-gray-200"
            }`}
          >
            <Text
              className={`font-semibold text-md ${
                activeTab === tab ? "text-black" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* USER LIST */}
      <FlatList
        data={paginated}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white mb-3 p-3 rounded-2xl shadow">
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1 flex-row justify-between items-center">
              {/* Email + Verified */}
              <View className="flex-row items-center flex-shrink">
                <Text className="text-gray-700 text-sm mr-2">{item.email}</Text>
                {item.verified ? (
                  <Ionicons name="checkmark-circle" size={18} color="green" />
                ) : (
                  <Ionicons name="close-circle" size={18} color="red" />
                )}
              </View>

              {/* Right Arrow */}
         <AntDesign name="arrow-right" size={15} color="black" />
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="flex-row justify-between items-center mt-3 mb-5">
            <TouchableOpacity
              disabled={page === 1}
              onPress={() => setPage(page - 1)}
              className={`px-5 py-2 rounded-lg ${
                page === 1 ? "bg-gray-300" : "bg-[#FFB800]"
              }`}
            >
              <Text className="text-white font-semibold">Prev</Text>
            </TouchableOpacity>

            <Text className="font-medium text-gray-700">
              Page {page} / {totalPages || 1}
            </Text>

            <TouchableOpacity
              disabled={page >= totalPages}
              onPress={() => setPage(page + 1)}
              className={`px-5 py-2 rounded-lg ${
                page >= totalPages ? "bg-gray-300" : "bg-[#FFB800]"
              }`}
            >
              <Text className="text-black font-semibold">Next</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Users;
