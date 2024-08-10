import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import CategoriesScreen from "../Screens/BottomTabs/CategoriesScreen";
import HomeScreen from "../Screens/BottomTabs/DashboardScreen";
import OrdersScreen from "../Screens/BottomTabs/OrdersScreen";
import ProductsScreen from "../Screens/BottomTabs/ProductsScreen";

import { GlobalColors } from "./GlobalVariables";
import { firebaseAuth } from "./firebase.config";
import LogOut from "../Services/LogOut";
import { resetOrders } from "../redux/Slices/OrdersSlice";
import { resetProducts } from "../redux/actions/allProducts";
import { resetCategories } from "../redux/actions/allCategories";

const BottomTab = createBottomTabNavigator();

const tdf =
  process.env.EXPO_PUBLIC_u2 +
  process.env.EXPO_PUBLIC_u9 +
  process.env.EXPO_PUBLIC_u1 +
  process.env.EXPO_PUBLIC_u0;

const TabBarIcon = ({ focused, iconName, showBadge }) => (
  <View>
    <Ionicons
      name={focused ? `${iconName}-sharp` : `${iconName}-outline`}
      size={24}
      color="#000"
    />
    {showBadge && <View style={styles.badge} />}
  </View>
);

const BottomTabScreenRaw = ({ navigation }) => {
  const dispatch = useDispatch();
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  const orders = useSelector((state) => state.Orders);
  const filteredOrdersCount = Object.values(orders).filter(
    (order) => order.s.c === 0
  ).length;

  useEffect(() => {
    setPendingOrdersCount(filteredOrdersCount);
  }, [filteredOrdersCount]);

  const handleUserStateChange = async (user) => {
    if (user?.emailVerified && user.uid === tdf) return;

    await dispatch(resetOrders());
    await dispatch(resetProducts());
    await dispatch(resetCategories());
    await LogOut();
    navigation.replace("LoginScreen");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleUserStateChange);
    return unsubscribe;
  }, [firebaseAuth]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color="#000"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "fast-food-sharp" : "fast-food-outline"}
              size={24}
              color="#000"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Category"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "shapes-sharp" : "shapes-outline"}
              size={24}
              color="#000"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconName="fast-food"
              showBadge={pendingOrdersCount > 0}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
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
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 2,
  },
  tabBarLabel: {
    color: "#000",
  },
  badge: {
    backgroundColor: "rgba(10,150,255,1)",
    width: 10,
    height: 10,
    position: "absolute",
    right: -3,
    borderRadius: 10,
  },
});

export default BottomTabScreenRaw;
