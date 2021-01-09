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

  const resetValues = () => {
    setNewUserName("");
    setNewUserAge("");
  };

  // console.log(myContext);
  let currentUserName = myContext.userName;
  let currentUserAge = myContext.userAge;
  let currentUserUnderlyingHealthCond = myContext.userUnderlyingHealthCond;

  // Getting AsyncStorage keys
  let USER_NAME_KEY = myContext.USER_NAME_KEY;
  let USER_AGE_KEY = myContext.USER_AGE_KEY;
  let USER_CONDITION_KEY = myContext.USER_CONDITION_KEY;

  const [newUserName, setNewUserName] = useState("");
  const [newUserAge, setNewUserAge] = useState("");
  const [
    newUserUnderlyingHealthCond,
    setNewUserUnderlyingHealthCond,
  ] = useState(false);
  const [showEditDetailsModal, SetShowEditDetailsModal] = useState(false);

  /**
   * This method updates the information about the user in the AsyncStorage
   * as well as in the Context.
   */
  const updateUserInfo = () => {
    // Updating AsyncStorage
    AsyncStorageController.saveData(USER_NAME_KEY, newUserName);
    AsyncStorageController.saveData(USER_AGE_KEY, newUserAge);
    AsyncStorageController.saveData(
      USER_CONDITION_KEY,
      newUserUnderlyingHealthCond + ""
    );

    // Updating Context
    myContext.userName = newUserName;
    myContext.userAge = newUserAge;
    myContext.userUnderlyingHealthCond = newUserUnderlyingHealthCond;

    // User feedback and dismiss modal
    alert("Information successfully updated");
    SetShowEditDetailsModal(false);
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

      {/* Showing name */}
      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={currentUserName}
        keyboardType={"default"}
        maxLength={16}
        editable={false}
      />

      {/* Showing age */}
      <CustomTextInput
        marginTop={20}
        height={30}
        width={"60%"}
        backgroundColor={"white"}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={currentUserAge}
        keyboardType={"number-pad"}
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
        maxLength={3}
        editable={false}
      />

      {/* Change details button TODO: change colour of button */}
      <CustomButton
        name={"Edit details"}
        textFontSize={18}
        height={30}
        width={"40%"}
        disabled={false}
        marginTop={20}
        onPressOut={() => SetShowEditDetailsModal(true)}
      />

      {/* Modal allowing to change user details */}
      <Modal
        visible={showEditDetailsModal}
        animationType={"slide"}
        statusBarTranslucent={false}
        onRequestClose={() => SetShowEditDetailsModal(false)}
        presentationStyle={"fullScreen"}
        onShow={resetValues}
      >
        {/* Getting and updating the new details using this component */}
        <UserRegistration
          title={"Edit details"}
          subtitle={"Update your name, age and underlying health conditions"}
          buttonName={"Update"}
          onCompleted={updateUserInfo}
          newUserName={newUserName}
          setNewUserName={(name) => setNewUserName(name)}
          newUserAge={newUserAge}
          setNewUserAge={(age) => setNewUserAge(age)}
          newUserUnderlyingHealthCond={newUserUnderlyingHealthCond}
          setNewUserUnderlyingHealthCond={(underlyingCondition) =>
            setNewUserUnderlyingHealthCond(underlyingCondition)
          }
        />
      </Modal>
    </View>
  );
};

export default Profile;
