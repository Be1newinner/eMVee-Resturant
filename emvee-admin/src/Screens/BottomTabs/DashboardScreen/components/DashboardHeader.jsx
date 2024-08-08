import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const DashboardHeader = ({ onLogOut }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>eMVee Dashboard</Text>
    <FontAwesome name="sign-out" size={28} color="black" onPress={onLogOut} />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
  },
});
