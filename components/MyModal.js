//start working on a custom modal

import React from "react";
import { Text, View, Modal, StyleSheet, Button } from "react-native";

// This is a custom modal, adapted to display the beach data when a beach is clicked
const MyModal = ({ modalVisible, closeModal }) => {
  if (!modalVisible) return <View></View>;
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
      //onShow={() => alert("HI")}
    >
      {/* Modal container */}
      <View style={styles.modalContainer}>
        {/* title */}
        <Text style={styles.title}>BASIC MODAL!</Text>

        {/* Close modal */}
        <Button title="Close" onPress={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    marginTop: 120,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 5,
    height: "60%",
    paddingBottom: 5,
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#50ad38",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default MyModal;
