import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import StackScreens from "./src/Infrastructure/StackScreen";
import store from "./src/redux/store";
import RealtimeOrdersController from "./src/Services/OrdersController/RealtimeOrdersController";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <ApplicationProvider {...eva} theme={eva.light}>
            <StackScreens />
            <RealtimeOrdersController />
          </ApplicationProvider>
        </SafeAreaView>
        <StatusBar style="dark" hidden={true} />
      </SafeAreaProvider>
    </Provider>
  );
}
