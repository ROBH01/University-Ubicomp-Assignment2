import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "../screens/Activities";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import colors from "../assets/colors";

//TODO: Create Bottom Tab Navigator that is made by the different screens
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
