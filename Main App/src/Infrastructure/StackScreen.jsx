import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../Screens/Stack/WelcomeScreen";
import SignInScreen from "../Screens/Stack/SignInScreen";
import BurgerScreen from "../Screens/Stack/BurgerScreen";
import CategoryItems from "../Screens/Stack/CategoryItems";
import FriedRiceScreen from "../Screens/Stack/FriedRiceScreen";
import BottomTabNavigation from "../Infrastructure/BottomTabScreen";
import ProductDetail from "../Screens/Stack/ProductDetail";
import ProfileScreen from "../Screens/Stack/ProfileScreen";
import CartScreen from "../Screens/Stack/CartScreen";
import OrderConfirm from "../Screens/Stack/OrderConfirm";

const Stack = createNativeStackNavigator();

export default function StackScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTab">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTab"
          component={BottomTabNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProductDetail"
          component={ProductDetail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CategoryItems"
          component={CategoryItems}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CartScreen"
          component={CartScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OrderConfirm"
          component={OrderConfirm}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Burger"
          component={BurgerScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Fried"
          component={FriedRiceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
