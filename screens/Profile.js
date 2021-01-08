import React, { useState } from "react";
import { Text, View, Modal } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import UserRegistration from "./UserRegistration";
import AppContext from "../components/AppContext";
import { useContext } from "react";
import { AsyncStorageController } from "../APIs/AsyncStorage";

/** Profile screen displays the current information held about the user that
 * was typed in at the registration stage. It also allows editing it.
 */
const Profile = () => {
  // Getting data from Context
  const myContext = useContext(AppContext);
  // console.log(myContext);
  let currentUserName = myContext.userName;
  let currentUserAge = myContext.userAge;
  let currentUserUnderlyingHealthCond = myContext.userUnderlyingHealthCond;

  // get async keys
  let username_key = myContext.username_key;
  let userage_key = myContext.userage_key;
  let usercondition_key = myContext.usercondition_key;

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [
    newUserUnderlyingHealthCond,
    setNewUserUnderlyingHealthCond,
  ] = useState(false);
  //
  const [showChangeInfoModal, setShowChangeInfoModal] = useState(false);
  //
  console.log("CHECKING UHC: " + newUserUnderlyingHealthCond);
  console.log("And datatype: " + typeof newUserUnderlyingHealthCond);

  /**
   * This method updates the information about the user in the AsyncStorage
   * as well as in the Context.
   */
  const updateUserInfo = () => {
    // Updating AsyncStorage
    AsyncStorageController.saveData(username_key, newName);
    AsyncStorageController.saveData(userage_key, newAge);
    AsyncStorageController.saveData(
      usercondition_key,
      newUserUnderlyingHealthCond + ""
    );

    // Updating Context
    myContext.userName = newName;
    myContext.userAge = newAge;
    myContext.userUnderlyingHealthCond = newUserUnderlyingHealthCond;

    alert("Information successfully updated");
    setShowChangeInfoModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgray",
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 24, color: "black" }}>
        My details
      </Text>

      {/* Name */}
      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={currentUserName}
        keyboardType={"default"}
        //onChangeText={(name) => setNewName(name)}
        maxLength={16}
        editable={false}
      />

      {/* Age */}
      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={currentUserAge}
        keyboardType={"number-pad"}
        //onChangeText={(age) => setNewAge(age)}
        maxLength={3}
        editable={false}
      />

      {/* Showing underlying health conditions */}
      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={
          currentUserUnderlyingHealthCond
            ? "With underlying health conditions"
            : "No underlying health conditions"
        }
        keyboardType={"number-pad"}
        //onChangeText={(age) => setNewAge(age)}
        maxLength={3}
        editable={false}
      />

      {/* Change details button TODO: change colour of button ALSO EDIT > NO DATA SHOULD BE GRAYED OUT! IS NOT */}
      <CustomButton
        name={"Edit details"}
        textFontSize={18}
        height={30}
        width={"40%"}
        disabled={false}
        marginTop={20}
        onPressOut={() => setShowChangeInfoModal(true)}
      />

      {/* Modal allowing to change user details */}
      <Modal
        visible={showChangeInfoModal}
        animationType={"slide"}
        statusBarTranslucent={false}
        onRequestClose={() => setShowChangeInfoModal(false)}
        presentationStyle={"fullScreen"}
      >
        <UserRegistration
          title={"Edit details"}
          text={"Update your name, age and underlying health conditions"}
          buttonName={"Update"}
          completed={updateUserInfo}
          userName={newName}
          setUserName={(name) => setNewName(name)}
          userAge={newAge}
          setUserAge={(age) => setNewAge(age)}
          userUnderlyingHealthCond={newUserUnderlyingHealthCond}
          setUserUnderlyingHealthCond={(newUnderlyingCondition) =>
            setNewUserUnderlyingHealthCond(newUnderlyingCondition)
          }
        />
      </Modal>
    </View>
  );
};

export default Profile;
