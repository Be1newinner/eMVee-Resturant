import { PRODUCT_FEATURES } from "@/constants/ProductDetails";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function ProductFeatures() {
  return (
    <View style={styles.featuresRow}>
      {PRODUCT_FEATURES.map((item) => (
        <View key={item.key}>
          <View style={styles.featureBox}>
            {item.key === 0 ? (
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={Dimensions.get("screen").width / 4 - 50}
                color={GlobalColors.themeColor}
              />
            ) : item.key === 1 ? (
              <MaterialIcons
                name="money"
                size={Dimensions.get("screen").width / 4 - 50}
                color={GlobalColors.themeColor}
              />
            ) : (
              <MaterialIcons
                name="workspace-premium"
                size={Dimensions.get("screen").width / 4 - 50}
                color={GlobalColors.themeColor}
              />
            )}
          </View>
          <Text style={styles.featureText}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  featureText: {
    color: "rgba(0,0,0,0.55)",
    fontWeight: "500",
    marginTop: 5,
    textAlign: "center",
  },
  featureBox: {
    backgroundColor: "rgba(50,150,255,0.18)",
    width: Dimensions.get("screen").width / 4,
    height: Dimensions.get("screen").width / 4,
    borderRadius: Dimensions.get("screen").width / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  featuresRow: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
});
