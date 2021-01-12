import React, { useState } from "react";
import { useEffect } from "react";
import { View, FlatList } from "react-native";
import getActivities from "../APIs/Activities-api";
import ActivityRowCard from "../components/ActivityRowCard";
import SearchBox from "../components/SearchBox";
import CustomButton from "../components/CustomButton";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
////
import AppContext from "../components/AppContext";
import { useContext } from "react";
import ActivityCheckerModal from "../components/ActivityChecker";
import MyModal from "../components/MyModal";

//TODO: Create Activities screen that is made by different components
const Activities = () => {
  useFocusEffect(
    React.useCallback(() => {
      //alert("Screen was focused");
      refreshData();
      // Do something when the screen is focused
      // return () => {
      //   alert("Screen was unfocused");
      //   // Do something when the screen is unfocused
      //   // Useful for cleanup functions
      // };
    }, [])
  );

  //TODO: Use the following state if want to add extra activities by the user!
  const [activities, setActivities] = useState(getActivities());
  const [refresh, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [
    activityCheckerModalVisible,
    setActivityCheckerModalVisible,
  ] = useState(false);

  // Getting data from context
  const myContext = useContext(AppContext);
  //myContext.NEW();

  // REFRESHING ACTIVITIES???
  //myContext.provideUserSpecificActivityFeedback();
  const [yy, setYY] = useState(null);

  const deleteSearchValue = () => {
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
    //TODO: Implement refreshing NOT WORKING!
    //setActivities(getActivities());
    //alert("Refreshed");
    let x = [...getActivities()];
    setYY(x);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        //justifyContent: "center",
        backgroundColor: "lightgray",
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <ActivityCheckerModal
        modalVisible={activityCheckerModalVisible}
        //activityRiskLabel={activityRiskLabel}
        // riskStatusColor={
        //   activityRiskLevel <= 20
        //     ? colors.lowRisk
        //     : activityRiskLevel <= 40
        //     ? colors.moderateLowRisk
        //     : activityRiskLevel <= 60
        //     ? colors.moderateRisk
        //     : activityRiskLevel <= 80
        //     ? colors.moderateHighRisk
        //     : activityRiskLevel > 80
        //     ? colors.highRisk
        //     : colors.riskUnavailable
        // }
        //riskValue={activityRiskLevel}
        //feedback={activityFeedback}
        closeModal={() => setActivityCheckerModalVisible(false)}
      />

      {/* <MyModal
        modalVisible={resultsModalVisible}
        activityRiskLabel={activityRiskLabel}
        riskStatusColor={
          activityRiskLevel <= 20
            ? colors.lowRisk
            : activityRiskLevel <= 40
            ? colors.moderateLowRisk
            : activityRiskLevel <= 60
            ? colors.moderateRisk
            : activityRiskLevel <= 80
            ? colors.moderateHighRisk
            : activityRiskLevel > 80
            ? colors.highRisk
            : colors.riskUnavailable
        }
        riskValue={activityRiskLevel}
        feedback={activityFeedback}
        closeModal={() => setResultsModalVisible(false)}
      /> */}

      <View
        style={{
          //backgroundColor: "pink",
          width: "100%",
          height: 60,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-around",
          //backgroundColor: "pink",
        }}
      >
        <SearchBox
          searchValue={searchValue}
          onSearch={onSearch}
          deleteSearchValue={deleteSearchValue}
        />
        <CustomButton
          name="Activity checker"
          height={35}
          width={"35%"}
          disabled={false}
          onPressOut={() => setActivityCheckerModalVisible(true)}
          textFontSize={14}
        />
      </View>

      {/* <Text style={{ fontSize: 24 }}>Activities screen</Text> */}
      {/* <Button title="Toggle modal" onPress={() => setModalVisible(true)} />
      {/* <Text style={{ fontSize: 26, alignSelf: "center", marginTop: 40 }}>
        Add new activity
      </Text> */}

      {/* Starting FlatList from here! */}
      <FlatList
        data={activities}
        extraData={yy}
        style={
          {
            //marginLeft: 5,
            //marginRight: 5,
            //marginTop: 40,
            //backgroundColor: "blue",
          }
        }
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
