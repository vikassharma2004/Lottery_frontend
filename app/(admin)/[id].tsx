import { StyleSheet, View, Text, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Sample data
const sessionsData = [
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
];

const InfoRow = ({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) => (
  <View className="flex-row justify-between border-b border-gray-100 py-2">
    <Text className="text-gray-500 font-medium">{label}</Text>
    <Text className={`text-gray-900 font-semibold ${valueClass}`}>{value}</Text>
  </View>
);

const SessionDetails = () => {
  const { sessionId } = useLocalSearchParams();
  const router = useRouter();
  const session = sessionsData.find(s => s.id === sessionId);

  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');

  if (!session) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-base">Session not found ❌</Text>
        <Text className="text-blue-500 mt-3" onPress={() => router.back()}>
          ← Go Back
        </Text>
      </View>
    );
  }

  const handleAbortSession = () => {
    if (otp.length !== 6) {
      alert('Enter a valid 6-digit OTP');
      return;
    }
    // TODO: Call API to abort session
    alert('Session aborted successfully ✅');
    setOtp('');
    setOtpModalVisible(false);
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-semibold text-gray-900 mb-4">
        {session.deviceName}
      </Text>

      <View className="space-y-3 mb-6">
        <InfoRow label="Platform" value={session.platform} />
        <InfoRow label="Timezone" value={session.timezone} />
        <InfoRow label="IP Address" value={session.ipAddress} />
        <InfoRow
          label="Valid"
          value={session.valid ? 'Yes ✅' : 'No ❌'}
          valueClass={session.valid ? 'text-green-600' : 'text-red-600'}
        />
        <InfoRow
          label="Created At"
          value={new Date(session.createdAt).toLocaleString()}
        />
        <InfoRow
          label="Expires At"
          value={new Date(session.expiresAt).toLocaleString()}
        />
      </View>

      <TouchableOpacity
        className="bg-red-600 px-5 py-3 rounded-lg"
        onPress={() => setOtpModalVisible(true)}
      >
        <Text className="text-white text-center font-semibold">Abort Session</Text>
      </TouchableOpacity>

      {/* OTP Modal */}
      <Modal
        visible={otpModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-5">
          <View className="bg-white w-full rounded-xl p-5">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Abort
            </Text>
            <Text className="text-gray-500 mb-4">
              Enter the 6-digit OTP to confirm aborting this session.
            </Text>
            <TextInput
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              className="border border-gray-300 rounded-lg p-3 text-center text-lg mb-4"
              placeholder="••••••"
            />
            <TouchableOpacity
              className="bg-red-600 px-5 py-3 rounded-lg mb-2"
              onPress={handleAbortSession}
            >
              <Text className="text-white text-center font-semibold">Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-300 px-5 py-3 rounded-lg"
              onPress={() => setOtpModalVisible(false)}
            >
              <Text className="text-gray-800 text-center font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SessionDetails;

const styles = StyleSheet.create({});
