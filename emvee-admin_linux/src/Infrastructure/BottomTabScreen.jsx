import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoriesScreen from "../Screens/BottomTabs/CategoriesScreen";
import HomeScreen from "../Screens/BottomTabs/DashboardScreen";
// import UserScreen from "../Screens/BottomTabs/UsersScreen";
import OrdersScreen from "../Screens/BottomTabs/OrdersScreen";
import ProductsScreen from "../Screens/BottomTabs/ProductsScreen";

import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./GlobalVariables";
import { Dimensions, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase.config";
import LogOut from "../Services/LogOut";
import { resetOrders } from "../Services/Slices/OrdersSlice";
import { resetProducts } from "../Services/Slices/AllProductsSlice";
import { resetCategories } from "../Services/Slices/AllCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const tdf =
  process.env.EXPO_PUBLIC_u2 +
  "" +
  process.env.EXPO_PUBLIC_u9 +
  "" +
  process.env.EXPO_PUBLIC_u1 +
  "" +
  process.env.EXPO_PUBLIC_u0;

const BottomTabScreenRaw = ({ navigation }) => {
  const dispatch = useDispatch();
  const [PendingOrdersState, setPendingOrdersState] = useState(0);

  const QuantitySelector = useSelector((selector) => selector.Orders);
  const tempPendingOrdersCount = Object.values(QuantitySelector).filter(
    (e) => e.s.c == 0
  ).length;

  useEffect(() => {
    setPendingOrdersState(tempPendingOrdersCount);
  }, [tempPendingOrdersCount]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          if (user.uid != tdf) {
            await dispatch(resetOrders());
            await dispatch(resetProducts());
            await dispatch(resetCategories());
            await LogOut();
            navigation.replace("LoginScreen");
          }
        } else {
          await dispatch(resetOrders());
          await dispatch(resetProducts());
          await dispatch(resetCategories());
          await LogOut();
          navigation.replace("LoginScreen");
        }
      } else {
        await dispatch(resetOrders());
        await dispatch(resetProducts());
        await dispatch(resetCategories());
        await LogOut();
        navigation.replace("LoginScreen");
      }
    });
  }, [firebaseAuth, tempPendingOrdersCount]);

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
            <View>
              <Ionicons
                name={focused ? "fast-food-sharp" : "fast-food-outline"}
                size={24}
                color="white"
              />

              {PendingOrdersState > 0 ? (
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
        name="Orders"
        component={OrdersScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreenRaw;
