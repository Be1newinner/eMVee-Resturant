import { StyleSheet, Text, View } from "react-native";

export const DashboardCard = ({ label, value, containerStyle }) => (
  <View style={[styles.cardContainer, containerStyle]}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: "25%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  cardLabel: {
    fontWeight: "700",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "700",
  },
});
