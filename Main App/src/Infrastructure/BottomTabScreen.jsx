import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryScreen from "../Screens/BottomTabs/CategoryScreen";
import HomeScreen from "../Screens/BottomTabs/HomeScreen";
import SettingScreen from "../Screens/BottomTabs/SettingScreen";

import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { GlobalColors } from "./GlobalVariables";

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:  GlobalColors.themeColor,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign name="home" size={26} color={"#fff"} />
          ),
        }}
        name="Main"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="category" size={26} color={"white"} />
          ),
        }}
        name="Category"
        component={CategoryScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="user" size={26} color={"white"} />
          ),
        }}
        name="SettingScreen"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
