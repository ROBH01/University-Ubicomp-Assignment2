import React from "react";
import { View, Text } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LabeledSwitch from "react-native-custom-switches/LabeledSwitch";
import CustomButton from "../components/CustomButton";

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
    <View
      style={{
        backgroundColor: "lightgray",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 24, color: "black" }}>
        {title}
      </Text>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 16,
          color: "black",
          textAlign: "center",
        }}
      >
        {subtitle}
      </Text>
      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Enter name"}
        keyboardType={"default"}
        onChangeText={setNewUserName}
        maxLength={16}
      />

      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Enter age"}
        keyboardType={"number-pad"}
        onChangeText={setNewUserAge}
        maxLength={3}
      />
      <View
        style={{
          alignSelf: "center",
          marginTop: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "black", marginBottom: 10 }}>
          Do you have any underlying health conditions?
        </Text>

        {/* Label switch used to get the underlying health condition */}
        <LabeledSwitch
          value={newUserUnderlyingHealthCond}
          onChange={setNewUserUnderlyingHealthCond}
          disabledColor="#e63111"
          enabledColor="#008000"
          disabledLabel="No"
          enabledLabel="Yes"
          width={90}
        />
      </View>
      <View style={{ height: 30, width: "100%", alignItems: "center" }}>
        <CustomButton
          name={buttonName}
          textFontSize={18}
          height={30}
          width={"40%"}
          disabled={
            newUserName.length === 0 || newUserAge.length === 0 ? true : false
          }
          onPressOut={onCompleted}
        />
      </View>
    </View>
  );
};

export default UserRegistration;
