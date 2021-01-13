import React, { useState } from "react";
import { View, FlatList } from "react-native";
import getActivities from "../APIs/Activities-api";
import ActivityRowCard from "../components/ActivityRowCard";
import SearchBox from "../components/SearchBox";
import CustomButton from "../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import ActivityCheckerModal from "../components/ActivityChecker";

/**
 * This component renders the Activities screen
 */
const Activities = () => {
  // Update risk colour associated with the activities when tab pressed
  useFocusEffect(
    React.useCallback(() => {
      refreshData();
    }, [])
  );

  const [activities, setActivities] = useState(getActivities());
  const [extraData, setExtraData] = useState(null);
  const [refresh, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [
    activityCheckerModalVisible,
    setActivityCheckerModalVisible,
  ] = useState(false);

  const deleteSearchBoxValue = () => {
    setSearchValue("");
    setActivities(getActivities);
  };

  const onSearch = (text) => {
    setSearchValue(text);
    let activitiesSorted = getActivities();
    if (text) {
      activitiesSorted = activitiesSorted.filter((activity) => {
        const newValueLowerCase = text.toLowerCase();
        const activityLowerCase = activity.activityName.toLowerCase();
        return activityLowerCase.indexOf(newValueLowerCase) > -1;
      });
    }
    setActivities(activitiesSorted);
  };

  function refreshData() {
    setExtraData([...getActivities()]);
  }

  return (
    // Main view
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "lightgray",
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      {/* Used to handle the personalised activities */}
      <ActivityCheckerModal
        modalVisible={activityCheckerModalVisible}
        closeModal={() => setActivityCheckerModalVisible(false)}
      />

      {/* Search box and Activity Checker view */}
      <View
        style={{
          width: "100%",
          height: 60,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <SearchBox
          searchValue={searchValue}
          onSearch={onSearch}
          deleteSearchValue={deleteSearchBoxValue}
        />
        <CustomButton
          name="ACTIVITY CHECKER"
          height={35}
          width={"35%"}
          disabled={false}
          onPressOut={() => setActivityCheckerModalVisible(true)}
          textFontSize={12}
        />
      </View>

      {/* FlatList rendering activities */}
      <FlatList
        data={activities}
        extraData={extraData}
        refreshing={refresh}
        onRefresh={refreshData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ActivityRowCard
            activityName={item.activityName}
            activityRiskLabel={item.activityRiskLabel}
            activityBaseRiskValue={item.activityBaseRiskValue}
            activityType={item.activityType}
            imagePath={item.imagePath}
          />
        )}
      />
    </View>
  );
};

export default Activities;
