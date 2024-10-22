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
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

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
                <Stack.Screen name="BottomTabs" />
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
