import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GlobalColors } from "../../infrasrtructure/GlobalVariables";
import { Dimensions, View } from "react-native";
import { useSelector } from "react-redux";

export default function _layout() {
  const selector = useSelector((state) => state.Cart);
  const QuantitySelector = selector?.qty;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalColors.themeColor,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 5,
          height: 55,
          borderRadius: 10,
          elevation: 10,
          position: "absolute",
          bottom: 10,
          left: 10,
          width: Dimensions.get("screen").width - 20,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "silver",
      }}
    >
      <Tabs.Screen
        name="HomeScreen/index"
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
        name="CategoryScreen/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "shapes-sharp" : "shapes-outline"}
              size={24}
              color="white"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CartScreen/index"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={focused ? "cart-sharp" : "cart-outline"}
                size={24}
                color="white"
              />
              {QuantitySelector > 0 && (
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
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="OrdersScreen/index"
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
        name="SettingScreen/index"
        options={{
          title: "Setting",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "fast-food-sharp" : "fast-food-outline"}
              size={24}
              color="white"
            />
          ),
        }}
      />
    </Tabs>
  );
}
