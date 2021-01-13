//start working on a custom modal

import React, { useState } from "react";
import { Text, View, Modal, StyleSheet, Button } from "react-native";
import RiskStatusRectangle from "./RiskStatusRectangle";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import { Picker } from "@react-native-picker/picker";
import { color } from "react-native-reanimated";
import AppContext from "./AppContext";
import { useContext } from "react";
import MyModal from "./MyModal";
import colors from "../assets/colors";

// This is a custom modal, adapted to display the beach data when a beach is clicked
const ActivityCheckerModal = ({ modalVisible, closeModal }) => {
  if (!modalVisible) return <View></View>;

  // Getting data from context
  const myContext = useContext(AppContext);
  console.log(myContext);

  const [ageBand, setAgeBand] = useState("Less than 30");
  const [underlyingHealthCond, setUnderlyingHealthCond] = useState("No");
  const [otherPeopleInteraction, setOtherPeopleInteraction] = useState("No");
  const [timeSpentOnActivity, setTimeSpentOnActivity] = useState(
    "Less than 30m"
  );
  const [activityType, setActivityType] = useState("Outdoor");
  const [activityTimeExecution, setActivityTimeExecution] = useState(
    "During busy times"
  );
  const [results, setResults] = useState([]);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);

  function getResults() {
    // if (ageRange === "under30") {
    // _ageRange = 30
    // } else if (ageRange === "3065") {
    //   _ageRange =
    // }
    // console.log(
    //   ">>>>>>>>>>>>>>>>>: " + activityTimeExecution,
    //   typeof underlyingHealthCond
    // );
    // console.log(
    //   ageBand,
    //   underlyingHealthCond,
    //   otherPeopleInteraction,
    //   timeSpentOnActivity,
    //   activityType,
    //   activityTimeExecution
    // );
    let results = myContext.provideUserSpecificActivityFeedback(
      parseInt(ageBand),
      underlyingHealthCond === "true",
      otherPeopleInteraction === "true",
      parseInt(timeSpentOnActivity),
      activityType,
      activityTimeExecution
    );
    setResults(results);
    //console.log(results[1]);
    setResultsModalVisible(true);
  }

  return (
    <View>
      <MyModal
        modalVisible={resultsModalVisible}
        //activityRiskLabel={activityRiskLabel}
        riskStatusColor={
          results[0] <= 20
            ? colors.lowRisk
            : results[0] <= 40
            ? colors.moderateLowRisk
            : results[0] <= 60
            ? colors.moderateRisk
            : results[0] <= 80
            ? colors.moderateHighRisk
            : results[0] > 80
            ? colors.highRisk
            : colors.riskUnavailable
        }
        riskValue={results[0]}
        feedback={results[1]}
        closeModal={() => setResultsModalVisible(false)}
      />
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
          <Text style={styles.title}>Personalised activity</Text>

          {/* Age picker */}
          <Text style={{ alignSelf: "center", fontSize: 16, marginTop: 10 }}>
            Select age band
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: "65%",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <Picker
              selectedValue={ageBand}
              //mode="dialog"
              //prompt={"Select your"}
              style={{
                width: "100%",
                height: 25,
                alignSelf: "center",
              }}
              onValueChange={(itemIndex) => setAgeBand(itemIndex)}
            >
              <Picker.Item label="Less than 30" value="0" />
              <Picker.Item label="Between 30 and 65" value="1" />
              <Picker.Item label="Over 65" value="2" />
            </Picker>
          </View>

          {/* Underlying health conditions picker */}
          <Text style={{ alignSelf: "center", fontSize: 16, marginTop: 10 }}>
            Any underlying health conditions?
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: "65%",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <Picker
              selectedValue={underlyingHealthCond}
              //mode="dialog"
              //prompt={"Select your"}
              style={{
                width: "100%",
                height: 25,
                alignSelf: "center",
              }}
              onValueChange={(itemValue) => setUnderlyingHealthCond(itemValue)}
            >
              <Picker.Item label="No" value="false" />
              <Picker.Item label="Yes" value="true" />
            </Picker>
          </View>

          {/* Other people involved picker */}
          <Text style={{ alignSelf: "center", fontSize: 16, marginTop: 10 }}>
            Involves interaction with other people?
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: "65%",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <Picker
              selectedValue={otherPeopleInteraction}
              //mode="dialog"
              //prompt={"Select your"}
              style={{
                width: "100%",
                height: 25,
                alignSelf: "center",
              }}
              onValueChange={(itemValue) =>
                setOtherPeopleInteraction(itemValue)
              }
            >
              <Picker.Item label="No" value="false" />
              <Picker.Item label="Yes" value="true" />
            </Picker>
          </View>

          {/* Time spent on activity picker */}
          <Text style={{ alignSelf: "center", fontSize: 16, marginTop: 10 }}>
            How much time is spent on the activity?
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: "65%",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <Picker
              selectedValue={timeSpentOnActivity}
              //mode="dialog"
              //prompt={"Select your"}
              style={{
                width: "100%",
                height: 25,
                alignSelf: "center",
              }}
              onValueChange={(itemIndex) => setTimeSpentOnActivity(itemIndex)}
            >
              <Picker.Item label="Less than 30m" value="0" />
              <Picker.Item label="Between 30m and 60m" value="1" />
              <Picker.Item label="Over 60m" value="2" />
            </Picker>
          </View>

          {/* Activity type picker */}
          <Text style={{ alignSelf: "center", fontSize: 16, marginTop: 10 }}>
            Is it an indoor or outdoor activity?
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: "65%",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <Picker
              selectedValue={activityType}
              //mode="dialog"
              //prompt={"Select your"}
              style={{
                width: "100%",
                height: 25,
                alignSelf: "center",
              }}
              onValueChange={(itemValue) => setActivityType(itemValue)}
            >
              <Picker.Item label="Outdoor" value="outdoor" />
              <Picker.Item label="Indoor" value="indoor" />
            </Picker>
          </View>

          {/* Activity execution time picker */}
          <Text style={{ alignSelf: "center", fontSize: 16, marginTop: 10 }}>
            When this activity will be carried out?
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: "65%",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <Picker
              selectedValue={activityTimeExecution}
              //mode="dialog"
              //prompt={"Select your"}
              style={{
                width: "100%",
                height: 25,
                alignSelf: "center",
              }}
              onValueChange={(itemValue) => setActivityTimeExecution(itemValue)}
            >
              <Picker.Item label="During quiet times" value="quiet" />
              <Picker.Item label="During busy times" value="busy" />
            </Picker>
          </View>

          {/* /dddddddddddddddddddddddddddddddd */}

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
    // paddingLeft: 10,
    // paddingRight: 10,
    // borderRadius: 15,
    // marginTop: 120,
    // marginLeft: 20,
    // marginRight: 20,
    //margin: 30,
    // paddingTop: 5,
    //height: "65%",
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

export default ActivityCheckerModal;
