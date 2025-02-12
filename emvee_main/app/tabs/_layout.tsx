import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GlobalColors } from "../../infrasrtructure/GlobalVariables";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _layout() {
  const selector = useSelector((state: any) => state.Cart);
  const QuantitySelector = selector?.qty;

  const tabBar = [
    {
      id: 0,
      name: "HomeScreen",
      icon_active: "home-sharp",
      icon_inactive: "home-outline",
      title: "Home",
    },
    {
      id: 1,
      name: "CategoryScreen",
      icon_active: "shapes-sharp",
      icon_inactive: "shapes-outline",
      title: "Menu",
    },
    {
      id: 2,
      name: "CartScreen",
      icon_active: "cart-sharp",
      icon_inactive: "cart-outline",
      title: "Basket",
    },
    {
      id: 3,
      name: "OrdersScreen",
      icon_active: "fast-food-sharp",
      icon_inactive: "fast-food-outline",
      title: "Orders",
    },
    {
      id: 4,
      name: "SettingScreen",
      icon_active: "settings-sharp",
      icon_inactive: "settings-outline",
      title: "Home",
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "silver",
        }}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={24}
                color="white"
              />
            ),
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="CategoryScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "shapes-sharp" : "shapes-outline"}
                size={24}
                color="white"
              />
            ),
            title: "Menu",
          }}
        />
        <Tabs.Screen
          name="CartScreen"
          options={{
            title: "Basket",
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons
                  name={focused ? "cart-sharp" : "cart-outline"}
                  size={24}
                  color="white"
                />
                {QuantitySelector > 0 && (
                  <View style={styles.QuantitySelector} />
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="OrdersScreen"
          options={{
            title: "Orders",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "fast-food-sharp" : "fast-food-outline"}
                size={24}
                color="white"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="SettingScreen"
          options={{
            title: "Setting",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "settings-sharp" : "settings-outline"}
                size={24}
                color="white"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: GlobalColors.themeColor,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
    height: 55,
    borderRadius: 10,
    elevation: 10,
    position: "absolute",
    left: 20,
    width: Dimensions.get("screen").width - 20,
    marginLeft: 10,
  },
  QuantitySelector: {
    backgroundColor: "rgba(10,150,255,1)",
    width: 10,
    height: 10,
    position: "absolute",
    right: -3,
    borderRadius: 10,
  },
});
