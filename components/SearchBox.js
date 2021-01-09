import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const SearchBar = ({ searchValue, onSearch, deleteSearchValue }) => {
  // Used to display an icon the clears the text input
  const ClearInput = () => {
    if (searchValue !== "") {
      return (
        <Icon
          name="times"
          type="font-awesome"
          size={22}
          color="gray"
          onPress={deleteSearchValue}
        ></Icon>
      );
    }
    return null;
  };

  return (
    <View style={styles.searchView}>
      <TextInput
        autoCapitalize="none"
        value={searchValue}
        onChangeText={(text) => onSearch(text)}
        placeholder="Search for activity..."
        maxLength={20}
        style={styles.input}
      />
      {/* Icon that clears text input */}
      <ClearInput />
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    marginTop: 40,
    marginBottom: 20,
    elevation: 6,
  },
  input: {
    flex: 0.9,
    paddingHorizontal: 3,
    height: 35,
    padding: 5,
    fontSize: 15,
  },
});

export default SearchBar;