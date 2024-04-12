import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Auth
import LoginScreen from "../Screens/Stack/LoginScreen";

import BottomTabsModified from "../Screens/BottomTabsModified";
import OrdersDetails from "../Screens/Stack/OrdersDetails";

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
        {/* Auth  */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="BottomTab" component={BottomTabsModified} />
        <Stack.Screen name="OrdersDetails" component={OrdersDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
