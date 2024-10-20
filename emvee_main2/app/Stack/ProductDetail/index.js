import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddToCart from "@/components/AddToCart";
import BottomOrderBar from "@/components/BottomOrderBar";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "@/services/Slices/CartSlice";
import { getImageURL } from "@/services/offline/Image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetail() {
  const router = useRouter();
  const searchParams  = useLocalSearchParams();
  const productId = searchParams?.productId;
  const ProductData = useSelector((state) => state.Product[productId]);
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
          total: Quantity * ProductData.p,
        })
      );
    }
  }, [Quantity]);

  useEffect(() => {
    setQuantity(selector.items[ProductData.k]?.qty || 0);
  }, [selector]);

  return (
    <>
      <ScrollView style={{ position: "relative" }}>
        <View style={{ backgroundColor: "#fff", flex: 1, paddingBottom: 40 }}>
          <View style={{ position: "absolute", top: 10, left: 10, zIndex: 99 }}>
            <Pressable onPress={() => router.back()} style={{ marginRight: 10 }}>
              <Ionicons name="arrow-back-outline" size={36} color="#fff" />
            </Pressable>
            <Text style={{ color: "#fff", fontWeight: 500, fontSize: 18 }}>
              Product Details
            </Text>
          </View>

          <View>
            <LinearGradient
              colors={["rgba(0,0,0,0.8)", "transparent"]}
              style={{
                width: Dimensions.get("screen").width,
                height: "auto",
                aspectRatio: 1.3,
                position: "absolute",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />
            {ProductData.i ? (
              <Image
                source={{ uri: getImageURL(ProductData.k) }}
                style={{
                  width: Dimensions.get("screen").width,
                  aspectRatio: 1.3,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              />
            ) : (
              <View style={{
                width: Dimensions.get("screen").width,
                aspectRatio: 1.3,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Text style={{ fontWeight: 700, fontSize: 22 }}>
                  {ProductData.t}
                </Text>
              </View>
            )}
          </View>

          <View style={{ padding: 10, marginTop: 10, gap: 10 }}>
            <Text style={{ color: GlobalColors.productText, fontSize: 26, fontWeight: 600 }}>
              {ProductData.t}
            </Text>
            <Text style={{ color: GlobalColors.productText, lineHeight: 18 }}>
              {ProductData.d}
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
              <View>
                <Text style={{ color: GlobalColors.productText, fontSize: 18 }}>Price</Text>
                <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10 }}>
                  <Text style={{ color: GlobalColors.productText, fontSize: 26 }}>
                    ₹{ProductData.p}
                  </Text>
                  <Text style={{ color: GlobalColors.productText, fontSize: 20, textDecorationLine: "line-through" }}>
                    ₹{ProductData.m}
                  </Text>
                </View>
              </View>

              <AddToCart Quantity={Quantity} setQuantity={setQuantity} />
            </View>

            <View style={{ backgroundColor: "rgba(0,50,200,0.07)", height: 4, marginVertical: 20 }} />
            
            <View style={{ flexDirection: "row", gap: 20, justifyContent: "space-between" }}>
              {[
                { key: 0, title: "Free Delivery" },
                { key: 1, title: "Cash On Delivery" },
                { key: 2, title: "Premium Quality" },
              ].map((item) => (
                <View key={item.key}>
                  <View style={{
                    backgroundColor: "rgba(50,150,255,0.18)",
                    width: Dimensions.get("screen").width / 4,
                    height: Dimensions.get("screen").width / 4,
                    borderRadius: Dimensions.get("screen").width / 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
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
                  <Text style={{ color: "rgba(0,0,0,0.55)", fontWeight: 500, marginTop: 5, textAlign: "center" }}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ backgroundColor: "rgba(0,50,200,0.07)", height: 4, marginVertical: 20 }} />
            
            <View>
              <Text style={{ fontWeight: 700, fontSize: 18 }}>Country of Origin</Text>
              <Text style={{ fontSize: 16 }}>India</Text>
            </View>

            <View style={{ backgroundColor: "rgba(0,50,200,0.07)", height: 4, marginVertical: 20 }} />
          </View>
        </View>
      </ScrollView>
      <BottomOrderBar/>
    </>
  );
}
