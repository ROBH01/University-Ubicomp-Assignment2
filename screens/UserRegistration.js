import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LabeledSwitch from "react-native-custom-switches/LabeledSwitch";
import CustomButton from "../components/CustomButton";
import colors from "../assets/colors";

/**
 * This component is used to gather information from the user
 * such as name, age and underlying health conditions to
 * make the user experience more contextualised and relevant
 */
const UserRegistration = ({
  onCompleted,
  title,
  subtitle,
  buttonName,
  newUserName,
  setNewUserName,
  newUserAge,
  setNewUserAge,
  newUserUnderlyingHealthCond,
  setNewUserUnderlyingHealthCond,
}) => {
  return (
    // Main view
    <View style={styles.mainView}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>
      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Name text input */}
      <CustomTextInput
        marginTop={20}
        height={35}
        width={"60%"}
        backgroundColor={colors.white}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Enter name"}
        keyboardType={"default"}
        onChangeText={setNewUserName}
        maxLength={16}
      />

      {/* Age text input */}
      <CustomTextInput
        marginTop={20}
        height={35}
        width={"60%"}
        backgroundColor={colors.white}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Enter age"}
        keyboardType={"number-pad"}
        onChangeText={setNewUserAge}
        maxLength={3}
      />

      {/* Underlying health condition view */}
      <View style={styles.underlyingHealthConditionsView}>
        <Text style={{ color: "black", marginBottom: 10 }}>Do you have any underlying health conditions?</Text>

        {/* Label switch used to get the underlying health condition */}
        <LabeledSwitch
          value={newUserUnderlyingHealthCond}
          onChange={setNewUserUnderlyingHealthCond}
          disabledColor={colors.darkRed}
          enabledColor={colors.lightGreen}
          disabledLabel="No"
          enabledLabel="Yes"
          width={90}
        />
      </View>

      {/* Button */}
      <CustomButton
        name={buttonName}
        textFontSize={18}
        height={30}
        width={"40%"}
        disabled={newUserName.length === 0 || newUserAge.length === 0 ? true : false}
        onPressOut={onCompleted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.lightGray,
    flex: 1,
    justifyContent: "center",
  },
  title: { alignSelf: "center", fontSize: 24, color: "black" },
  subtitle: {
    alignSelf: "center",
    fontSize: 16,
    color: "black",
    marginTop: 10,
    textAlign: "center",
  },
  underlyingHealthConditionsView: {
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
});

export default UserRegistration;
