import React, { useState } from "react";
import { useEffect } from "react";
import { render } from "react-dom";
import { View, FlatList } from "react-native";
import getActivities from "../APIs/Activities-api";
import ActivityRowCard from "../components/ActivityRowCard";
import SearchBox from "../components/SearchBox";
////
//import AppContext from "../components/AppContext";
//import { useContext } from "react";

//TODO: Create Activities screen that is made by different components
const Activities = () => {
  //TODO: Use the following state if want to add extra activities by the user!
  const [activities, setActivities] = useState(getActivities());
  const [refresh, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async () => {
      console.log("hi");
    };
  }, []);

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
    alert("Refreshed");
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
      <SearchBox
        searchValue={searchValue}
        onSearch={onSearch}
        deleteSearchValue={deleteSearchValue}
      />
      {/* <Text style={{ fontSize: 24 }}>Activities screen</Text> */}
      {/* <Button title="Toggle modal" onPress={() => setModalVisible(true)} />
      {/* <Text style={{ fontSize: 26, alignSelf: "center", marginTop: 40 }}>
        Add new activity
      </Text> */}

      {/* Starting FlatList from here! */}
      <FlatList
        data={activities}
        //extraData={getActivities()}
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
