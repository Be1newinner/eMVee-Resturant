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
        {/* Auth  */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="BottomTab" component={BottomTabsModified} />
        <Stack.Screen name="OrdersDetails" component={OrdersDetails} />
        <Stack.Screen name="EditAddProducts" component={EditAddProducts} />
        <Stack.Screen name="EditAddCategories" component={EditAddCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
