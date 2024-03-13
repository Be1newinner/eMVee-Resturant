import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddToCart from "../../../Components/AddToCart";
import BottomOrderBar from "../../../Components/BottomOrderBar";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";

export default function ProductDetail({ navigation, item = [] }) {
  const ProductData = {
    image: require("../../../../assets/images/category/drinks.webp"),
    title: "Chicken Biryani",
    mrp: 770,
    price: 550,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  const [Quantity, setQuantity] = useState(0);

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
        <Image
          source={ProductData.image}
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
          {ProductData.title}
        </Text>
        <Text
          style={{
            color: GlobalColors.productText,
            lineHeight: 18,
          }}
        >
          {ProductData.description}
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
                ₹{ProductData.price}
              </Text>
              <Text
                style={{
                  color: GlobalColors.productText,
                  fontSize: 20,
                  textDecorationLine: "line-through",
                }}
              >
                ₹{ProductData.mrp}
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
