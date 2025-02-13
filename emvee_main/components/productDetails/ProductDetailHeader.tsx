import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductDetailHeader() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => router.canGoBack() && router.back()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back-outline" size={36} color="#000" />
      </Pressable>
      <Text style={styles.headerText}>Product Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 99,
    width: Dimensions.get("screen").width - 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 5,
    borderRadius: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 18,
  },
});
