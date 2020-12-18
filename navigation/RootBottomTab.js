import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "../screens/Activities";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";

//TODO: Create Bottom Tab Navigator that is made by the different screens
const BottomTabNav = createBottomTabNavigator();

const Tabs = ({ userLocation }) => {
  return (
    <BottomTabNav.Navigator
      initialRouteName="Activities"
      tabBarOptions={{
        activeTintColor: "#2196F3",
      }}
    >
      <BottomTabNav.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: "Activities",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />

      <BottomTabNav.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard counties",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" color={color} size={size} />
          ),
        }}
      />

      <BottomTabNav.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </BottomTabNav.Navigator>
  );
};

export default Tabs;
