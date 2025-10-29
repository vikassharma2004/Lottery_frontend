import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { axiosClient } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import COLORS from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";

const FILTERS = ["all", "pending", "completed", "failed", "cancelled"];

export default function PaymentHistory() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paymentData, setPaymentData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ✅ Mutation for manual fetching
  const fetchPayments = useMutation({
    mutationFn: async ({ page, status }) => {
      let url = `https://lottery-one-sage.vercel.app/api/payment/History?page=${page}&limit=10`;
      if (status && status !== "all") url += `&status=${status}`;
      const { data } = await axiosClient.get(url);
      return data;
    },
    onSuccess: (res, variables) => {
      const newData = res.data || [];
      setHasNextPage(res.pagination?.hasNextPage || false);

      // If refresh or status change → reset list
      if (variables.page === 1) {
        setPaymentData(newData);
      } else {
        setPaymentData((prev) => [...prev, ...newData]);
      }
    },
    onError: (err) => {
      console.error("Error fetching payments:", err);
    },
  });

  // ✅ Initial load
  useEffect(() => {
    fetchPayments.mutate({ page: 1, status: selectedStatus });
  }, [selectedStatus]);

  // ✅ Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    await fetchPayments.mutateAsync({ page: 1, status: selectedStatus });
    setIsRefreshing(false);
  };

  // ✅ Load more
  const handleEndReached = () => {
    if (hasNextPage && !fetchPayments.isPending) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPayments.mutate({ page: nextPage, status: selectedStatus });
    }
  };

  const renderStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

const renderItem = ({ item, index }) => (
  <Animated.View
    entering={FadeInDown.delay(index * 80).springify()}
    className="bg-white mb-3 p-3 rounded-xl shadow-md border border-gray-300"
    style={{ elevation: 2 }}
  >
    {/* Header Row */}
    <View className="flex-row justify-between items-center mb-2">
      <View>
        <Text className="text-base font-semibold text-gray-900 capitalize">
          {item.type === "withdrawal" ? "Withdrawal" : item.type}
        </Text>

        {/* 🔹 Static Withdrawal ID (temporary) */}
        {item.type === "withdrawal" && (
          <View className="flex-row items-center mt-0.5">
            <Text className="text-[10px] text-gray-600 font-medium">ID: </Text>
            <Text className="text-[10px] font-semibold text-blue-600">
              WD-123456
            </Text>
          </View>
        )}
      </View>

      {/* Status Pill */}
      <View
        className={`px-2 py-0.5 rounded-full border ${
          item.status === "completed"
            ? "bg-green-50 border-green-200"
            : item.status === "pending"
            ? "bg-yellow-50 border-yellow-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <Text
          className={`text-[10px] font-semibold ${renderStatusColor(
            item.status
          )}`}
        >
          {item.status.toUpperCase()}
        </Text>
      </View>
    </View>

    {/* 💰 Amount + Method */}
    <View className="mt-1 bg-gray-50 rounded-lg px-2 py-1 flex-row justify-between items-center">
      <Text className="text-gray-900 font-bold text-lg tracking-tight">
        ₹{item.amount.toLocaleString()}
      </Text>
      <View className="flex items-end">
        <Text className="text-[10px] text-gray-500">Method</Text>
        <Text className="font-semibold text-gray-800 text-xs">
          {item.method?.toUpperCase()}
        </Text>
      </View>
    </View>

    {/* Balance Info */}
    {item.type !== "deposit" && (
      <View className="mt-2 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">
        <Text className="text-gray-600 text-[10px]">
          Before:{" "}
          <Text className="font-semibold text-gray-800">
            ₹{item.balanceBefore?.toLocaleString() || "N/A"}
          </Text>
        </Text>
        <Text className="text-gray-600 text-[10px] mt-0.5">
          After:{" "}
          <Text className="font-semibold text-gray-800">
            ₹{item.balanceAfter?.toLocaleString() || "N/A"}
          </Text>
        </Text>
      </View>
    )}

    {/* Timestamp */}
    <Text className="text-gray-400 text-[10px] mt-2 text-right font-medium">
      {new Date(item.createdAt).toLocaleString()}
    </Text>
  </Animated.View>
);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setPage(1);
    fetchPayments.mutate({ page: 1, status });
  };

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5">
        <View>
          <Text className="text-3xl font-extrabold text-gray-900">Payment History</Text>
          <Text className="text-gray-500 text-sm mt-1">
            Track all your transactions in one place
          </Text>
        </View>
        <Ionicons name="wallet-outline" size={32} color={"green"} />
      </View>

      {/* Filters */}
      <View className="flex-row mb-4">
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleStatusChange(item)}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedStatus === item ? "bg-[#FFB800]" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedStatus === item ? "text-black" : "text-gray-700"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Content */}
      {fetchPayments.isPending && page === 1 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : paymentData.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="file-tray-outline" size={50} color="gray" />
          <Text className="text-gray-500 mt-2">No payment records found</Text>
        </View>
      ) : (
        <FlatList
          data={paymentData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.PRIMARY}
            />
          }
          ListFooterComponent={
            fetchPayments.isPending && page > 1 ? (
              <ActivityIndicator size="small" color={COLORS.PRIMARY} className="my-4" />
            ) : null
          }
        />
      )}
    </View>
  );
}
