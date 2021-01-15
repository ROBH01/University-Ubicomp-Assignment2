import React, { useState } from "react";
import { Text, View, Modal } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import UserRegistration from "./UserRegistration";
import AppContext from "../components/AppContext";
import { useContext } from "react";
import { AsyncStorageController } from "../APIs/AsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import getCurrentWeather from "../APIs/WeatherAPI";
import * as Location from "expo-location";
import colors from "../assets/colors";

/** Profile screen displays the current information held about the user that
 * was typed in at the registration stage. It also allows editing it.
 */
const Profile = () => {
  // Getting data from Context
  const myContext = useContext(AppContext);

  // Getting user data
  let currentUserName = myContext.userName;
  let currentUserAge = myContext.userAge;
  let currentUserUnderlyingHealthCond = myContext.userUnderlyingHealthCond;
  const [currentUserLocation, setCurrentUserLocation] = useState(myContext.weatherData[4]);

  // Getting AsyncStorage keys
  let USER_NAME_KEY = myContext.USER_NAME_KEY;
  let USER_AGE_KEY = myContext.USER_AGE_KEY;
  let USER_CONDITION_KEY = myContext.USER_CONDITION_KEY;

  // State vars used to obtain the new info from the user when information is edited
  const [newUserName, setNewUserName] = useState("");
  const [newUserAge, setNewUserAge] = useState("");
  const [newUserUnderlyingHealthCond, setNewUserUnderlyingHealthCond] = useState(false);
  const [showEditDetailsModal, SetShowEditDetailsModal] = useState(false);

  // Used to update user Location to current one
  useFocusEffect(
    React.useCallback(() => {
      updateLocation();
    }, [])
  );

  /**
   * Updates user location with current one
   */
  async function updateLocation() {
    let currentLocation = await Location.getCurrentPositionAsync({});
    let weatherData = await getCurrentWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
    setCurrentUserLocation(weatherData[4]);
  }

  /**
   * This method updates the information about the user in the AsyncStorage
   * as well as in the Context.
   */
  const updateUserInfo = () => {
    // Updating AsyncStorage
    AsyncStorageController.saveData(USER_NAME_KEY, newUserName);
    AsyncStorageController.saveData(USER_AGE_KEY, newUserAge);
    AsyncStorageController.saveData(USER_CONDITION_KEY, newUserUnderlyingHealthCond + "");

    // Updating Context
    myContext.userName = newUserName;
    myContext.userAge = newUserAge;
    myContext.userUnderlyingHealthCond = newUserUnderlyingHealthCond;

    // User feedback and dismissing modal
    alert("Information successfully updated");
    SetShowEditDetailsModal(false);
  };

  /**
   * Resets values as to keep the Update button disabled when no text is typed in
   */
  const resetValues = () => {
    setNewUserName("");
    setNewUserAge("");
  };

  return (
    // Main view
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.lightGray,
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 24, color: "black" }}>My Details</Text>

      {/* Showing name */}
      <CustomTextInput
        marginTop={20}
        height={35}
        width={"60%"}
        backgroundColor={colors.white}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Name: " + currentUserName}
        editable={false}
      />

      {/* Showing age */}
      <CustomTextInput
        marginTop={20}
        height={35}
        width={"60%"}
        backgroundColor={colors.white}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Age: " + currentUserAge}
        editable={false}
      />

      {/* Showing underlying health conditions */}
      <CustomTextInput
        marginTop={20}
        height={35}
        width={"60%"}
        backgroundColor={colors.white}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={
          currentUserUnderlyingHealthCond ? "With underlying health conditions" : "No underlying health conditions"
        }
        editable={false}
      />

      {/* Showing user current location */}
      <CustomTextInput
        marginTop={20}
        height={35}
        width={"60%"}
        backgroundColor={colors.white}
        alignSelf={"center"}
        textAlign={"center"}
        placeholder={"Currently in " + currentUserLocation}
        editable={false}
      />

      {/* Edit details */}
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
        {/* Getting new details from the user and updating existing ones */}
        <UserRegistration
          title={"Edit Details"}
          subtitle={"Update your name, age and underlying health conditions"}
          buttonName={"Update"}
          onCompleted={updateUserInfo}
          newUserName={newUserName}
          setNewUserName={(name) => setNewUserName(name)}
          newUserAge={newUserAge}
          setNewUserAge={(age) => setNewUserAge(age)}
          newUserUnderlyingHealthCond={newUserUnderlyingHealthCond}
          setNewUserUnderlyingHealthCond={(underlyingCondition) => setNewUserUnderlyingHealthCond(underlyingCondition)}
        />
      </Modal>
    </View>
  );
};

export default Profile;
