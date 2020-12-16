import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "../screens/Activities";
import Counties from "../screens/Counties";
import Profile from "../screens/Profile";

//TODO: Create Bottom Tab Navigator that is made by the different screens
const BottomTabNav = createBottomTabNavigator();

const Tabs = () => {
  return (
    <BottomTabNav.Navigator
      initialRouteName="Activities"
      tabBarOptions={{
        activeTintColor: "#e91e63",
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
        name="Counties"
        component={Counties}
        options={{
          tabBarLabel: "Counties statuses",
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
