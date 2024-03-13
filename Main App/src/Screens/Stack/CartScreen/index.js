import { Dimensions, Image, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import AddToCart from "../../../Components/AddToCart";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { OrderConfirmModal } from "../../../Components/OrderConfirmModal";
import { useState } from "react";

export default function CartScreen({ navigation }) {
  const CartData = [
    {
      image: require("../../../../assets/images/category/drinks.webp"),
      title: "Spicy Chiken Wings",
      quantity: 2,
      price: 120,
      key: 0,
    },
    {
      image: require("../../../../assets/images/category/drinks.webp"),
      title: "Spicy Chiken Wings",
      quantity: 2,
      price: 120,
      key: 1,
    },
    {
      image: require("../../../../assets/images/category/drinks.webp"),
      title: "Spicy Chiken Wings",
      quantity: 2,
      price: 120,
      key: 2,
    },
    {
      image: require("../../../../assets/images/category/drinks.webp"),
      title: "Spicy Chiken Wings",
      quantity: 2,
      price: 120,
      key: 3,
    },
  ];

  const cartTotal = {
    total: 150,
    subtotal: 150,
    tax: 10,
    delivery: 0,
  };

  const ConfirmOrder = () => {
    navigation.navigate("OrderConfirm");
  };

  const [visible, setVisible] = useState(false);

  return (
    <ScrollView
      style={{
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <TopView
          position="relative"
          navigation={navigation}
          color="#000"
          title={"Your Cart"}
        />
      </View>
      <View
        style={{
          padding: 10,
          marginTop: 20,
          gap: 10,
        }}
      >
        {CartData?.map((item) => (
          <View
            key={item.key}
            style={{
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 20,
              elevation: 5,
              flexDirection: "row",
              gap: 20,
            }}
          >
            <View
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "rgba(0,0,0,0.25)",
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: GlobalColors.themeColor,
                }}
              >
                {item.title}
              </Text>
              <Text>
                {item.quantity} x ₹{item.price}
              </Text>
              <AddToCart Quantity={1} variant={1} />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginRight: 5,
              }}
            >
              <AntDesign
                name="closecircleo"
                size={24}
                color={GlobalColors.themeColor}
              />
              <Text
                style={{
                  fontWeight: 600,
                  color: GlobalColors.themeColor,
                  fontSize: 16,
                }}
              >
                ₹{item.price * item.quantity}/-
              </Text>
            </View>
          </View>
        ))}

        <View
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            elevation: 5,
            gap: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              ₹{cartTotal.subtotal}/-
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Taxes
            </Text>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              ₹{cartTotal.tax}/-
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Delivery
            </Text>
            <Text
              style={{
                fontWeight: 500,
                color:
                  cartTotal.delivery == 0 ? GlobalColors.themeColor : "black",
              }}
            >
              {cartTotal.delivery == 0 ? "Free" : cartTotal.delivery}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              borderTopColor: "rgba(0,0,0,0.25)",
              borderTopWidth: 1,
              paddingTop: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              ₹{cartTotal.total}/-
            </Text>
          </View>
        </View>
      </View>
      <Button
        status="danger"
        style={{
          width: Dimensions.get("screen").width - 20,
          position: "relative",
          bottom: 0,
          left: 10,
        }}
        onPress={() => setVisible(true)}
      >
        Confirm Order
      </Button>
      <OrderConfirmModal
        visible={visible}
        setVisible={setVisible}
        onConfirm={ConfirmOrder}
      />
    </ScrollView>
  );
}
