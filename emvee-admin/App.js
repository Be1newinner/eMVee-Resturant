import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Screens from "./src/screens";

export default function App() {
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Screens />
      </SafeAreaView>
      <StatusBar style="dark" hidden={true} />
    </SafeAreaProvider>
  );
}
