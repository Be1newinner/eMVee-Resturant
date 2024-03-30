import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoriesScreen from "../Screens/BottomTabs/CategoriesScreen";
import HomeScreen from "../Screens/BottomTabs/DashboardScreen";
// import UserScreen from "../Screens/BottomTabs/UsersScreen";
import OrdersScreen from "../Screens/BottomTabs/OrdersScreen";
import ProductsScreen from "../Screens/BottomTabs/ProductsScreen";

import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./GlobalVariables";
import { Dimensions } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalColors.themeColor,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 5,
          height: 55,
          width: Dimensions.get("screen").width - 20,
          position: "absolute",
          bottom: 10,
          left: 10,
          borderRadius: 10,
          elevation: 10,
          borderBlockColor: "rgba(0,0,0,0.15)",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: "#fff",
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color="white"
            />
          ),
        }}
        name="Main"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: "#fff",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "fast-food-sharp" : "fast-food-outline"}
              size={24}
              color="white"
            />
          ),
        }}
        name="Products"
        component={ProductsScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: "#fff",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "shapes-sharp" : "shapes-outline"}
              size={24}
              color="white"
            />
          ),
        }}
        name="Category"
        component={CategoriesScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: "#fff",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "fast-food-sharp" : "fast-food-outline"}
              size={24}
              color="white"
            />
          ),
        }}
        name="Orders"
        component={OrdersScreen}
      />
      {/* <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: "#fff",
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={24}
              color="white"
            />
          ),
        }}
        name="Users"
        component={UserScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
