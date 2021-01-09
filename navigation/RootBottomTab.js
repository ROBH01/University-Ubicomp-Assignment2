import React from "react";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "../screens/Activities";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import colors from "../assets/colors";

const TabLabel = ({ labelName }) => {
  return <Text style={{ fontSize: 10, color: "#2196F3" }}>{labelName}</Text>;
};

// Bottom Tab Navigator made of different screens
const BottomTabNav = createBottomTabNavigator();

const Tabs = () => {
  return (
    <BottomTabNav.Navigator
      initialRouteName="Activities"
      tabBarOptions={{
        activeTintColor: colors.tabBarTint,
      }}
    >
      <BottomTabNav.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) return <TabLabel labelName={"ACTIVITIES"} />;
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={28} />
          ),
        }}
      />

      <BottomTabNav.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) return <TabLabel labelName={"DASHBOARD"} />;
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="earth" color={color} size={28} />
          ),
        }}
      />

      <BottomTabNav.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) return <TabLabel labelName={"USER"} />;
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={28} />
          ),
        }}
      />
    </BottomTabNav.Navigator>
  );
};

export default Tabs;
