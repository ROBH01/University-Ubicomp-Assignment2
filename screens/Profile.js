import React, { useState } from "react";
import { Text, View, Modal } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import UserRegistration from "./UserRegistration";
import AppContext from "../components/AppContext";
import { useContext } from "react";

//TODO: Create Profile screen that is made by different components
const Profile = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [showChangeInfoModal, setShowChangeInfoModal] = useState(true);

  //getting data from context
  // const myContext = useContext(AppContext);

  // console.log(newName);
  // console.log(newAge);
  // console.log("NEXT IS CONTEXT detail");
  // console.log(myContext.ONSCode);

  const updateUserInfo = () => {
    // TODO: Update in db and context + show alert confirming changes to user
    // How add to context???? (replacing old value)
    alert(
      "Update info in database and Context. Information successfully updated"
    );
    setShowChangeInfoModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2196F3",
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 24, color: "white" }}>
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
        placeholder={"old name (replace with var)"}
        keyboardType={"default"}
        onChangeText={(name) => setNewName(name)}
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
        placeholder={"old age (replace with var)"}
        keyboardType={"number-pad"}
        onChangeText={(age) => setNewAge(age)}
        maxLength={3}
        editable={false}
      />

      {/* Change details button */}
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
        />
      </Modal>
    </View>
  );
};

export default Profile;
