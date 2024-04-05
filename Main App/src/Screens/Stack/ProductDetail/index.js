import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddToCart from "../../../Components/AddToCart";
import BottomOrderBar from "../../../Components/BottomOrderBar";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "../../../Services/Slices/CartSlice";
import { getImageURL } from "../../../Services/offline/Image";

export default function ProductDetail({ navigation, route }) {
  const ProductData = route.params.product;
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

  useEffect(() => {
    console.log("ProductData => ", getImageURL(ProductData.k));
  }, [ProductData]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        height: Dimensions.get("screen").height,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 99,
          backgroundColor: "rgba(0,0,0,0)",
          flexDirection: "row",
          height: 40,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            elevation: 5,
            marginRight: 10,
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={36}
            color="#fff"
            style={{
              elevation: 5,
            }}
          />
        </Pressable>
        <Text
          style={{
            color: "#fff",
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          Product Details
        </Text>
      </View>

      <View>
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.8)",
            "transparent",
            "transparent",
            "transparent",
          ]}
          style={{
            width: Dimensions.get("screen").width,
            height: "auto",
            aspectRatio: 1.3,
            zIndex: 2,
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
              height: "auto",
              aspectRatio: 1.3,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderColor: "rgba(64,96,144,0.3)",
              borderWidth: 2,
            }}
          />
        ) : (
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: "auto",
              aspectRatio: 1.3,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderColor: "rgba(64,96,144,0.3)",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {ProductData.t}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          padding: 10,
          marginTop: 10,
          gap: 10,
        }}
      >
        <Text
          style={{
            color: GlobalColors.productText,
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          {ProductData.t}
        </Text>
        <Text
          style={{
            color: GlobalColors.productText,
            lineHeight: 18,
          }}
        >
          {ProductData.d}
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text
              style={{
                color: GlobalColors.productText,
                fontSize: 18,
              }}
            >
              Price
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: GlobalColors.productText,
                  fontSize: 26,
                }}
              >
                ₹{ProductData.p}
              </Text>
              <Text
                style={{
                  color: GlobalColors.productText,
                  fontSize: 20,
                  textDecorationLine: "line-through",
                }}
              >
                ₹{ProductData.m}
              </Text>
            </View>
          </View>

          <AddToCart Quantity={Quantity} setQuantity={setQuantity} />
        </View>
      </View>
      <BottomOrderBar navigation={navigation} />
    </View>
  );
}
