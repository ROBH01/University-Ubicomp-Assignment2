/**
 * This screen is used to gather information from the user
 * such as name, age and underlying health conditions as to
 * make the user experience more contextualised and relevant
 */

import React from "react";
import { View, Text } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LabeledSwitch from "react-native-custom-switches/LabeledSwitch";
import CustomButton from "../components/CustomButton";

const UserRegistration = ({
  completed,
  title,
  text,
  buttonName,
  userName,
  setUserName,
  userAge,
  setUserAge,
  userUnderlyingHealthCond,
  setUserUnderlyingHealthCond,
}) => {
  console.log("FROM PROFILE new name: " + userName);
  console.log("FROM PROFILE new age: " + userAge);
  return (
    <View
      style={{
        backgroundColor: "#2196F3",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 24, color: "white" }}>
        {title}
      </Text>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 16,
          color: "white",
          textAlign: "center",
        }}
      >
        {text}
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
        onChangeText={setUserName}
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
        onChangeText={setUserAge}
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
        <Text style={{ color: "white", marginBottom: 10 }}>
          Do you have any underlying health conditions?
        </Text>
        <LabeledSwitch
          value={userUnderlyingHealthCond}
          onChange={
            userUnderlyingHealthCond
              ? () => setUserUnderlyingHealthCond(false)
              : () => setUserUnderlyingHealthCond(true)
          }
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
            userName.length === 0 || userAge.length === 0 ? true : false
          }
          onPressOut={completed}
        />
      </View>
    </View>
  );
};

export default UserRegistration;