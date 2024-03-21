import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import StackScreens from "./src/Infrastructure/StackScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/Services/store"; // Import your store
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
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
            <StackScreens />
          </ApplicationProvider>
        </SafeAreaView>
        <StatusBar style="dark" hidden={true} />
      </SafeAreaProvider>
    </Provider>
  );
}
