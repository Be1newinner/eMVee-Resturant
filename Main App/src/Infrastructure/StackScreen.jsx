import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../Screens/Stack/WelcomeScreen";

// Auth
import RegisterScreen from "../Screens/Stack/Auth/RegisterScreen";
import LoginScreen from "../Screens/Stack/Auth/LoginScreen";
import VerifyEmail from "../Screens/Stack/Auth/VerifyEmail";

import BurgerScreen from "../Screens/Stack/BurgerScreen";
import CategoryItems from "../Screens/Stack/CategoryItems";
import FriedRiceScreen from "../Screens/Stack/FriedRiceScreen";
import BottomTabNavigation from "../Infrastructure/BottomTabScreen";
import ProductDetail from "../Screens/Stack/ProductDetail";
import ProfileScreen from "../Screens/Stack/ProfileScreen";
import CartScreen from "../Screens/Stack/CartScreen";
import OrderConfirm from "../Screens/Stack/OrderConfirm";
import OrdersDetails from "../Screens/Stack/OrdersDetails";
import ProductSearchScreen from "../Screens/Stack/ProductSearchScreen";
import AddAddressScreen from "../Screens/Stack/AddAddressScreen";
import AboutUs from "../Screens/Stack/AboutUs";
import TermsCondition from "../Screens/Stack/TermsCondition";
import PrivacyPolicy from "../Screens/Stack/PrivacyPolicy";

const Stack = createNativeStackNavigator();

export default function StackScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Auth  */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="CategoryItems" component={CategoryItems} />
        <Stack.Screen name="EditProfile" component={ProfileScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
        <Stack.Screen name="OrdersDetails" component={OrdersDetails} />
        <Stack.Screen
          name="ProductSearchScreen"
          component={ProductSearchScreen}
        />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="TermsCondition" component={TermsCondition} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Burger" component={BurgerScreen} />
        <Stack.Screen name="Fried" component={FriedRiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
