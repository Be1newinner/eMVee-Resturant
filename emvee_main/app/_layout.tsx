import { Stack, useNavigationContainerRef } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "../services/store";
import { StatusBar } from "expo-status-bar";
import RealtimeOrdersController from "../services/OrdersController/RealtimeOrdersController";
import * as SplashScreen from "expo-splash-screen";
import ContextProviders from "../services/ContextProviders";
// import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Layout() {
  // const navigationRef = useNavigationContainerRef();
  // useReactNavigationDevTools(navigationRef);

  useEffect(() => {
    (async function () {
      try {
        const token = await registerForPushNotificationsAsync();

        if (token) {
          await AsyncStorage.setItem("FCM_Token", token);
          console.log("THE TOKEN", token);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <ContextProviders>
        <Provider store={store}>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <ApplicationProvider {...eva} theme={eva.light}>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>

              <RealtimeOrdersController />
            </ApplicationProvider>
          </SafeAreaView>
          <StatusBar style="dark" hidden={true} />
        </Provider>
      </ContextProviders>
    </SafeAreaProvider>
  );
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
  }
  return token;
}
