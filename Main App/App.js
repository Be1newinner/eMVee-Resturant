import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import StackScreens from "./src/Infrastructure/StackScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <ApplicationProvider {...eva} theme={eva.light}>
          <StackScreens />
        </ApplicationProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
