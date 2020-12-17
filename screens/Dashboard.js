import React from "react";
import { Text, View } from "react-native";

//TODO: Create Dashboard with counties screen that is made by different components
const Dashboard = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink",
      }}
    >
      <Text style={{ fontSize: 24 }}>Dashboard screen</Text>
    </View>
  );
};

export default Dashboard;
