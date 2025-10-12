import React from "react";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import COLORS from "@/constants/Colors";

const screenWidth = Dimensions.get("window").width;

const PaymentBarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: COLORS.BACKGROUND,
    backgroundGradientFrom: COLORS.BACKGROUND,
    backgroundGradientTo: COLORS.BACKGROUND,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 184, 0, ${opacity})`, // primary color
    labelColor: () => COLORS.TEXT,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: COLORS.PRIMARY },
  };

  const graphStyle = {
    marginVertical: 8,
    borderRadius: 16,
  };

  return (
    <View style={{ backgroundColor: COLORS.BACKGROUND, padding: 20, borderRadius: 16 }}>
      <Text style={{ color: COLORS.TEXT, fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Payment Trends
      </Text>
      <BarChart
        style={graphStyle}
        data={data}
        width={screenWidth - 40} // padding for container
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30} // optional
        fromZero={true}
      />
    </View>
  );
};

export default PaymentBarChart;
