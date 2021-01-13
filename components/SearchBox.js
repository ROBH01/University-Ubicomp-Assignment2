import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";

const SearchBar = ({ searchValue, onSearch, deleteSearchValue }) => {
  // Used to display an icon the clears the text input
  const ClearInput = () => {
    if (searchValue !== "") {
      return <Icon name="times" type="font-awesome" size={22} color={colors.gray} onPress={deleteSearchValue}></Icon>;
    }
    return null;
  };

  // Used to display a magnifier icon when there is no text
  const ShowSearchIcon = () => {
    if (searchValue === "") {
      return <Icon name="search" type="font-awesome" size={20} color={colors.gray}></Icon>;
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
      <ClearInput />
      <ShowSearchIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 35,
    alignSelf: "center",
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
