import React, { useState } from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";
import AppContext from "./AppContext";
import { useContext } from "react";
import MyModal from "./MyModal";
import colors from "../assets/colors";

/**
 * This is a custom modal, adapted to display choices to the user as to
 * obtain feedback on personalised activities based on the input
 * @param {*} param0
 */
const ActivityCheckerModal = ({ modalVisible, closeModal }) => {
  if (!modalVisible) return <View></View>;

  // Getting data from context and setting state vars
  const myContext = useContext(AppContext);
  const [ageBand, setAgeBand] = useState("Less than 30");
  const [underlyingHealthCond, setUnderlyingHealthCond] = useState("No");
  const [otherPeopleInteraction, setOtherPeopleInteraction] = useState("No");
  const [timeSpentOnActivity, setTimeSpentOnActivity] = useState("Less than 30m");
  const [activityType, setActivityType] = useState("Outdoor");
  const [activityTimeExecution, setActivityTimeExecution] = useState("During busy times");
  const [finalResults, setFinalResults] = useState([]);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);

  /**
   * Provides the results based on the choices selected from the user
   */
  function getResults() {
    let results = myContext.getFeedbackOnSpecificActivity(
      parseInt(ageBand),
      underlyingHealthCond === "true",
      otherPeopleInteraction === "true",
      parseInt(timeSpentOnActivity),
      activityType,
      activityTimeExecution
    );
    setFinalResults(results);
    setResultsModalVisible(true);
  }

  return (
    <View>
      {/* Results Modal */}
      <MyModal
        modalVisible={resultsModalVisible}
        activityRiskLabel={finalResults[2]}
        riskStatusColor={
          finalResults[0] <= 20
            ? colors.lowRisk
            : finalResults[0] <= 40
            ? colors.moderateLowRisk
            : finalResults[0] <= 60
            ? colors.moderateRisk
            : finalResults[0] <= 80
            ? colors.moderateHighRisk
            : finalResults[0] > 80
            ? colors.highRisk
            : colors.riskUnavailable
        }
        riskValue={finalResults[0]}
        feedback={finalResults[1]}
        closeModal={() => setResultsModalVisible(false)}
      />
      {/* Customised Modal */}
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
          <Text style={styles.title}>Personalised activity</Text>

          {/* Age picker */}
          <Text style={styles.subtitle}>Select age band</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={ageBand}
              style={styles.pickerStyle}
              onValueChange={(itemIndex) => setAgeBand(itemIndex)}
            >
              <Picker.Item label="Less than 30" value="0" />
              <Picker.Item label="Between 30 and 65" value="1" />
              <Picker.Item label="Over 65" value="2" />
            </Picker>
          </View>

          {/* Underlying health conditions picker */}
          <Text style={styles.subtitle}>Any underlying health conditions?</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={underlyingHealthCond}
              style={styles.pickerStyle}
              onValueChange={(itemValue) => setUnderlyingHealthCond(itemValue)}
            >
              <Picker.Item label="No" value="false" />
              <Picker.Item label="Yes" value="true" />
            </Picker>
          </View>

          {/* Other people involved picker */}
          <Text style={styles.subtitle}>Involves interaction with other people?</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={otherPeopleInteraction}
              style={styles.pickerStyle}
              onValueChange={(itemValue) => setOtherPeopleInteraction(itemValue)}
            >
              <Picker.Item label="No" value="false" />
              <Picker.Item label="Yes" value="true" />
            </Picker>
          </View>

          {/* Time spent on activity picker */}
          <Text style={styles.subtitle}>How much time is spent on the activity?</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={timeSpentOnActivity}
              style={styles.pickerStyle}
              onValueChange={(itemIndex) => setTimeSpentOnActivity(itemIndex)}
            >
              <Picker.Item label="Less than 30m" value="0" />
              <Picker.Item label="Between 30m and 60m" value="1" />
              <Picker.Item label="Over 60m" value="2" />
            </Picker>
          </View>

          {/* Activity type picker */}
          <Text style={styles.subtitle}>Is it an indoor or outdoor activity?</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={activityType}
              style={styles.pickerStyle}
              onValueChange={(itemValue) => setActivityType(itemValue)}
            >
              <Picker.Item label="Outdoor" value="outdoor" />
              <Picker.Item label="Indoor" value="indoor" />
            </Picker>
          </View>

          {/* Activity execution time picker */}
          <Text style={styles.subtitle}>When this activity will be carried out?</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={activityTimeExecution}
              style={styles.pickerStyle}
              onValueChange={(itemValue) => setActivityTimeExecution(itemValue)}
            >
              <Picker.Item label="During quiet times" value="quiet" />
              <Picker.Item label="During busy times" value="busy" />
            </Picker>
          </View>

          {/* Obtain results */}
          <CustomButton
            disabled={false}
            height={30}
            textFontSize={16}
            onPressOut={getResults}
            marginTop={20}
            width={"50%"}
            name={"GET RESULTS"}
          />

          {/* Close modal */}
          <CustomButton
            disabled={false}
            height={30}
            textFontSize={16}
            onPressOut={closeModal}
            marginTop={40}
            width={"50%"}
            name={"CLOSE"}
          />
        </View>
      </Modal>
    </View>
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
  subtitle: {
    alignSelf: "center",
    fontSize: 16,
    marginTop: 10,
  },
  pickerView: {
    backgroundColor: colors.white,
    height: 25,
    width: "78%",
    marginTop: 5,
    alignSelf: "center",
  },
  pickerStyle: {
    width: "100%",
    height: 25,
    alignSelf: "center",
  },
});

export default ActivityCheckerModal;
