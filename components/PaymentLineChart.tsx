import React from "react";
import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import COLORS from "@/constants/Colors";

const screenWidth = Dimensions.get("window").width;

const PaymentLineChart = () => {
  return (
    <View>
          <Text style={{ color: COLORS.TEXT, fontSize: 18, fontWeight: "bold", marginBottom: 8 ,paddingLeft:20 }}>
        Payment Trends
      </Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            { data: [50, 100, 75, 125, 90, 150] },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: COLORS.BACKGROUND,
          backgroundGradientFrom: COLORS.BACKGROUND,
          backgroundGradientTo: COLORS.BACKGROUND,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 184, 0, ${opacity})`, // theme primary
          labelColor: () => COLORS.TEXT,
          style: { borderRadius: 16 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: COLORS.PRIMARY },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default PaymentLineChart;
