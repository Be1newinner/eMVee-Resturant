import { StyleSheet, Text, View } from "react-native";
import { DashboardCard } from "./DashboardCard";

export const OrderStats = ({ title, stats }) => (
  <>
    <Text style={styles.orderStatsTitle}>{title}</Text>
    <View style={styles.orderStatsContainer}>
      {Object.values(stats)?.map((item) => (
        <DashboardCard key={item.label} label={item.label} value={item.value} />
      ))}
    </View>
  </>
);

const styles = StyleSheet.create({
  orderStatsTitle: {
    fontWeight: "40",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
  orderStatsContainer: {
    backgroundColor: "#eee",
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 5,
  },
});
