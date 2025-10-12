import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PaymentLineChart from '@/components/PaymentLineChart'
import PaymentPieChart from '@/components/PaymentBarChart'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
  return (
    <SafeAreaView className='flex-1 '>
      <View>
        <Text className='text-2xl mx-auto text-purple-500 '>Analysis</Text>
      </View>
    <View>

      
      <PaymentLineChart/>
      <PaymentPieChart/>
    </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({})