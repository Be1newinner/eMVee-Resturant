import { StyleSheet, Text, View } from "react-native";

export const DashboardSection = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    {children}
  </View>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
