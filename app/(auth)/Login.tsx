import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const Login = () => {
  return (
   <SafeAreaView className='flex-1 bg-white px-10 pt-10 m-10'>
    <View>
      <Text>
        hello
      </Text>
      <Link href="/ReferEarn"> GOT TO HOME</Link>
      <Link href="/ContactDetails"> contact</Link>
      <Link href="/Reports"> allre</Link>
      {/* <Link href="/Report"> allre</Link> */}
      <Link href="/reports/3">repot</Link>
      <Link href="/(withdraw)">with draw</Link>
      {/* <Link href="/ReferEarn"> GOT TO HOME</Link> */}

    </View>
   </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})