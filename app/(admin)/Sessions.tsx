import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
type Session = {
  id: string;
  deviceName: string;
  platform: string;
  timezone: string;
  ipAddress: string;
  valid: boolean;
  createdAt: string;
  expiresAt: string;
};
const sessionsData: Session[] = [
  {
    id: '68ec8257393954903a609b8b',
    deviceName: 'Pixel 7',
    platform: 'Android',
    timezone: 'Asia/Kolkata',
    ipAddress: 'Unknown',
    valid: true,
    createdAt: '2025-10-13T04:38:47.211Z',
    expiresAt: '2025-12-12T04:38:47.201Z',
  },
  // add more items here
];
const Sessions = () => {
  const router=useRouter()
  const renderItem = ({item}: {item: Session}) => (
    <View className="flex-row justify-between items-center bg-gray-100 border border-gray-200 rounded-lg p-4 mb-3">
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">
          {item.deviceName}
        </Text>
        <Text className="text-sm text-gray-500 mt-0.5">
          {item.platform} • {item.timezone}
        </Text>
        <Text className="text-xs text-gray-400 mt-1">
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/SessionDetails",
            params: { sessionId: item.id },
          })
        }
        className="bg-blue-500 px-3 py-1.5 rounded-md">
        <Text className="text-white font-medium">Go →</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <FlatList
        data={sessionsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Sessions

const styles = StyleSheet.create({})