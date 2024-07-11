import React from "react";
import { Text, View } from "react-native";

const Header = ({ category }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>
      {category ? "Edit" : "Add New"} Category
    </Text>
  </View>
);

const styles = {
  header: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 700,
  },
};

export default Header;
