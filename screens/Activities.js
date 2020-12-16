import React, { useState } from "react";
import { Text, View, ActivityIndicator, Button } from "react-native";
import MyModal from "../components/MyModal";

//TODO: Create Activities screen that is made by different components
const Activities = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
      }}
    >
      <MyModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />

      {/* This is the loading part */}
      {/* <ActivityIndicator size="large" color="#000" /> */}

      <Text style={{ fontSize: 24 }}>Activities screen</Text>
      <Button title="Toggle modal" onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default Activities;
