import { Tabs } from "expo-router";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function BottomTabsModified() {
  return (
    <Tabs>
      <Tabs.Screen name="HomeScreen" component={HomeScreen} />
    </Tabs>
  );
}
