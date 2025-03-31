import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddToCart from "@/components/AddToCart";

export default function ProductPriceSection({
  ProductData,
  Quantity,
  setQuantity,
}: {
  ProductData: {
    pd: number;
    p: number;
  };
  Quantity: number;
  setQuantity: () => null;
}) {
  return (
    <View style={styles.priceSection}>
      <View>
        <Text style={styles.priceLabel}>Price</Text>
        {ProductData.pd ? (
          <View style={styles.discountContainer}>
            <View style={styles.priceRow}>
              <AntDesign
                name="arrowdown"
                size={16}
                color={
                  Math.round((ProductData.pd / ProductData.p) * 100) > 100
                    ? GlobalColors.themeColor
                    : GlobalColors.discountPercent
                }
              />
              <Text
                style={[
                  styles.discountPercentage,
                  {
                    color:
                      Math.round((ProductData.pd / ProductData.p) * 100) > 100
                        ? GlobalColors.themeColor
                        : GlobalColors.discountPercent,
                  },
                ]}
              >
                {Math.round((ProductData.pd / ProductData.p) * 100)}%
              </Text>
              <Text style={styles.originalPrice}>₹{ProductData.p}/-</Text>
            </View>
            <Text style={styles.discountedPrice}>₹{ProductData.pd}/-</Text>
          </View>
        ) : (
          <Text style={styles.normalPrice}>₹{ProductData.p}/-</Text>
        )}
      </View>
      <AddToCart Quantity={Quantity} setQuantity={setQuantity} />
    </View>
  );
}

const styles = StyleSheet.create({
  priceLabel: {
    color: GlobalColors.productText,
    fontSize: 18,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
  },
  discountContainer: {
    gap: 10,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  normalPrice: {
    fontWeight: "500",
    marginLeft: 5,
    fontSize: 18,
  },
  discountedPrice: {
    fontWeight: "900",
    marginLeft: 5,
    fontSize: 18,
  },
  originalPrice: {
    fontWeight: "900",
    marginLeft: 5,
    textDecorationLine: "line-through",
    color: GlobalColors.discountPricing,
  },
  discountPercentage: {
    fontWeight: "900",
    marginLeft: 5,
  },
});
