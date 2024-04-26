import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryScreen from "../Screens/BottomTabs/CategoryScreen";
import HomeScreen from "../Screens/BottomTabs/HomeScreen";
import OrdersScreen from "../Screens/BottomTabs/OrdersScreen";
import CartBottomScreen from "../Screens/BottomTabs/CartScreen";

import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./GlobalVariables";
import { Dimensions, View } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  const selector = useSelector((state) => state.Cart);
  const QuantitySelector = selector?.qty;
  console.log("Cart Selector in Bottom Tabs => ", QuantitySelector);

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
              name={focused ? "shapes-sharp" : "shapes-outline"}
              size={24}
              color="white"
            />
          ),
        }}
        name="Category"
        component={CategoryScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: "#fff",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={focused ? "cart-sharp" : "cart-outline"}
                size={24}
                color="white"
              />
              {QuantitySelector > 0 ? (
                <View
                  style={{
                    backgroundColor: "rgba(10,150,255,1)",
                    width: 10,
                    height: 10,
                    position: "absolute",
                    right: -3,
                    borderRadius: 10,
                  }}
                />
              ) : null}
            </View>
          ),
        }}
        name="Cart"
        component={CartBottomScreen}
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
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
