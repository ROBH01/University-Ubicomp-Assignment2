import React from "react";
import { Text, View } from "react-native";

//TODO: Create Profile screen that is made by different components
const Profile = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2196F3",
      }}
    >
      <Text style={{ fontSize: 24 }}>Profile screen</Text>
    </View>
  );
};

export default Profile;
