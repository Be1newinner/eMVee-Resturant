import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getImageURL } from "@/services/offline/Image";

export default function ProductImageView({
  ProductData,
}: {
  ProductData: {
    i: string;
    k: string;
    t: string;
  };
}) {
  return (
    <View>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.gradient}
      />
      {ProductData.i ? (
        <Image
          source={{ uri: getImageURL(ProductData.k) }}
          style={styles.productImage}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>{ProductData.t}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: Dimensions.get("screen").width,
    height: "auto",
    aspectRatio: 1.3,
    position: "absolute",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  noImageText: {
    fontWeight: "700",
    fontSize: 22,
  },
  noImageContainer: {
    width: Dimensions.get("screen").width,
    aspectRatio: 1.3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: Dimensions.get("screen").width,
    aspectRatio: 1.3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
