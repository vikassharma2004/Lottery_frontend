
import {  View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Image } from 'react-native';
import React, { useState } from 'react'
import "../../global.css"
import { SafeAreaView } from 'react-native-safe-area-context'
import signup from "../../assets/images/Auth.png"
import { Link, useRouter } from 'expo-router';
const SignUp = () => {
  const Router=useRouter()
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = () => {
    console.log({ email, password, referralCode });
    // Add form submit logic
  };
  return (
    <SafeAreaView className='flex-1 h-full  bg-[#FFF8E7] px-10 justify-center'>

     <View className="">
            {/* Replace with your image */}
            <Image
              source={signup}
              className="w-full h-72 "
              resizeMode="cover"
            />
          </View>

          {/* Form Fields */}
          <View className="flex">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-[#BDBDBD] rounded-lg mt-10  text-[#212121]"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              className="border border-[#BDBDBD] rounded-lg px-4 py-3 text-[#212121]"
            />
            <TextInput
              value={referralCode}
              onChangeText={setReferralCode}
              placeholder="Referral Code (max 6)"
              maxLength={6}
              className="border border-[#BDBDBD] rounded-lg px-4 py-3 text-[#212121]"
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#FFB800] rounded-lg py-3 items-center mt-2"
            >
              <Text className="text-white font-bold text-lg">Submit</Text>
            </TouchableOpacity>
          </View>

          {/* Already have account */}
          <TouchableOpacity className="mt-6 items-center">
            <Text className="text-[#43A047] font-semibold" >
              Already have an account?
              <Link href={"/Login"}/>
              
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignUp

