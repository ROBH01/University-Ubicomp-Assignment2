import React, { useState } from "react";
import { View, FlatList, Vibration } from "react-native";
import getActivities from "../APIs/Activities-api";
import ActivityRowCard from "../components/ActivityRowCard";
import SearchBox from "../components/SearchBox";
import CustomButton from "../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import ActivityCheckerModal from "../components/ActivityChecker";
import colors from "../assets/colors";
/**
 * This component renders the Activities screen which includes
 * a Search function, a Personalised Activity checker, a FlatList
 * and a RowCard component
 */
const Activities = () => {
  // Update risk colour associated with the activities when tab pressed
  useFocusEffect(
    React.useCallback(() => {
      refreshData(false);
    }, [])
  );

  const [activities, setActivities] = useState(getActivities());
  const [extraData, setExtraData] = useState(null);
  const [refresh, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activityCheckerModalVisible, setActivityCheckerModalVisible] = useState(false);

  /**
   * Deletes values from the search box and refreshes activities
   */
  const deleteSearchBoxValue = () => {
    setSearchValue("");
    setActivities(getActivities);
  };

  /**
   * Filters the activities by the name typed in the search box
   * @param {string} text
   */
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

  /**
   * Refreshes the activities
   * @param {boolean} userFeedback - whether vibrate on complete or not
   */
  function refreshData(userFeedback = true) {
    setExtraData([...getActivities()]);
    if (userFeedback) {
      Vibration.vibrate(20);
    }
  }

  return (
    // Main view
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.lightGray,
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
        <SearchBox searchValue={searchValue} onSearch={onSearch} deleteSearchValue={deleteSearchBoxValue} />
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
