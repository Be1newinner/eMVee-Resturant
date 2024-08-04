import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/Services/store"; // Import your store
import { StatusBar } from "expo-status-bar";
import RealtimeOrdersController from "@/Services/OrdersController/RealtimeOrdersController";
import ContextProviders from "@/Services/ContextProviders";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ContextProviders>
      <Provider store={store}>
        <SafeAreaProvider
          style={{
            backgroundColor: "black",
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <ApplicationProvider {...eva} theme={eva.light}>
              <Stack />
              <RealtimeOrdersController />
            </ApplicationProvider>
          </SafeAreaView>
          <StatusBar style="dark" hidden={true} />
        </SafeAreaProvider>
      </Provider>
    </ContextProviders>
  );
}
