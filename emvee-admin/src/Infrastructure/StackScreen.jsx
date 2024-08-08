import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/Stack/LoginScreen";
import BottomTabsModified from "../Screens/BottomTabsModified";
import OrdersDetails from "../Screens/Stack/OrdersDetails";
import EditAddProducts from "../Screens/Stack/EditAddProducts";
import EditAddCategories from "../Screens/Stack/EditAddCategories";

const Stack = createNativeStackNavigator();

export default function StackScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "eMVee Dashboard",
          }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTabsModified}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrdersDetails"
          component={OrdersDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditAddProducts"
          component={EditAddProducts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditAddCategories"
          component={EditAddCategories}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
