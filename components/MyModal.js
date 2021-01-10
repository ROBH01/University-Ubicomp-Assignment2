//start working on a custom modal

import React from "react";
import { Text, View, Modal, StyleSheet, Button } from "react-native";
import RiskStatusRectangle from "./RiskStatusRectangle";
import CustomButton from "./CustomButton";

// This is a custom modal, adapted to display the beach data when a beach is clicked
const MyModal = ({
  modalVisible,
  closeModal,
  riskStatusColor,
  riskValue,
  feedback,
  activityRiskLabel,
}) => {
  if (!modalVisible) return <View></View>;

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      statusBarTranslucent={false}
      onRequestClose={closeModal}
      presentationStyle={"formSheet"}
    >
      {/* Modal container */}
      <View style={styles.modalContainer}>
        {/* title */}
        <Text style={styles.title}>Covid risk level</Text>

        {/* PROGRESS BAR */}
        <View
          style={{
            height: 20,
            width: "80%",
            //backgroundColor: "pink",
            alignSelf: "center",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>low</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>high</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 25,
            alignSelf: "center",
            backgroundColor: "white",
            marginTop: 5,
            //borderRadius: 15,
          }}
        >
          <RiskStatusRectangle
            statusColor={riskStatusColor}
            width={riskValue + "%"}
            height={25}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: 15,
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {activityRiskLabel} ({riskValue}%)
        </Text>

        {/* Section text feedback about the activity with suggestions */}

        <View
          style={{
            //height: 100, //TODO: remove after adding the text to let it self sizing
            width: "90%",
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>{feedback}</Text>
        </View>

        {/* Close modal */}
        <CustomButton
          disabled={false}
          height={30}
          textFontSize={16}
          onPressOut={closeModal}
          marginTop={10}
          width={"50%"}
          name={"CLOSE"}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    // borderRadius: 15,
    // marginTop: 120,
    // marginLeft: 20,
    // marginRight: 20,
    //margin: 30,
    // paddingTop: 5,
    //height: "60%",
    // paddingBottom: 5,
    alignContent: "center",
    //justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default MyModal;
