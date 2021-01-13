import React from "react";
import { Text, View, Modal, StyleSheet, Button } from "react-native";
import RiskStatusRectangle from "./RiskStatusRectangle";
import CustomButton from "./CustomButton";
import colors from "../assets/colors";

/**
 * This is a custom modal that displays detailed info
 * about each activity when one is pressed
 * @param {*} param0
 */
const MyModal = ({ modalVisible, closeModal, riskStatusColor, riskValue, feedback, activityRiskLabel }) => {
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
        {/* Title */}
        <Text style={styles.title}>Covid risk level</Text>

        {/* Progress bar labels */}
        <View style={styles.progressBarLabelsView}>
          <Text style={styles.progressBarLabels}>low</Text>
          <Text style={styles.progressBarLabels}>high</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <RiskStatusRectangle statusColor={riskStatusColor} width={riskValue + "%"} height={25} />
        </View>

        {/* Activity risk lavel label */}
        <Text style={styles.activityRiskLevel}>
          {activityRiskLabel} ({riskValue}%)
        </Text>

        {/* Feedback about the activity */}
        <View style={styles.feedback}>
          <Text style={{ fontSize: 16 }}>{feedback}</Text>
        </View>

        {/* Close modal */}
        <CustomButton
          disabled={false}
          height={30}
          textFontSize={16}
          onPressOut={closeModal}
          marginTop={5}
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
    backgroundColor: colors.appMainBackground,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  progressBarLabelsView: {
    height: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarLabels: {
    fontWeight: "bold",
    fontSize: 16,
  },
  progressBar: {
    flexDirection: "row",
    width: "80%",
    height: 25,
    alignSelf: "center",
    backgroundColor: colors.white,
    marginTop: 5,
  },
  activityRiskLevel: {
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  feedback: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MyModal;
