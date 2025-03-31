import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import BottomOrderBar from "@/components/BottomOrderBar";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "@/services/Slices/CartSlice";
import { useLocalSearchParams } from "expo-router";
import ProductFeatures from "@/components/productDetails/ProductFeatures";
import ProductImageView from "@/components/productDetails/ProductImageView";
import ProductPriceSection from "@/components/productDetails/ProductPriceSection";
import ProductDetailHeader from "@/components/productDetails/ProductDetailHeader";

export default function ProductDetail() {
  const searchParams = useLocalSearchParams();
  const productId = searchParams?.productId;
  const ProductData = useSelector((state) => state.AllProducts.data).find(
    (item) => item.k == productId
  );
  const selector = useSelector((state) => state.Cart);

  const [Quantity, setQuantity] = useState(
    selector.items[ProductData.k]?.qty || 0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (Quantity >= 0) {
      dispatch(
        addInCart({
          ...ProductData,
          qty: Quantity,
          total: Quantity * (ProductData.pd ? ProductData.pd : ProductData.p),
        })
      );
    }
  }, [Quantity]);

  useEffect(() => {
    setQuantity(selector.items[ProductData.k]?.qty || 0);
  }, [selector]);

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <ProductDetailHeader />

          <ProductImageView ProductData={ProductData} />

          <View style={styles.contentContainer}>
            <Text style={styles.productTitle}>{ProductData.t}</Text>
            <Text style={styles.productDescription}>{ProductData.d}</Text>

            <ProductPriceSection ProductData={ProductData} />
            <View style={styles.separator} />

            <ProductFeatures />

            <View style={styles.separator} />

            <View>
              <Text style={styles.originTitle}>Country of Origin</Text>
              <Text style={styles.originText}>India</Text>
            </View>

            <View style={styles.separator} />
          </View>
        </View>
      </ScrollView>
      <BottomOrderBar />
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    position: "relative",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 40,
  },
  contentContainer: {
    padding: 10,
    marginTop: 10,
    gap: 10,
  },
  productTitle: {
    color: GlobalColors.productText,
    fontSize: 26,
    fontWeight: "600",
  },
  productDescription: {
    color: GlobalColors.productText,
    lineHeight: 18,
  },
  separator: {
    backgroundColor: "rgba(0,50,200,0.07)",
    height: 4,
    marginVertical: 20,
  },
  originTitle: {
    fontWeight: "700",
    fontSize: 18,
  },
  originText: {
    fontSize: 16,
  },
});
