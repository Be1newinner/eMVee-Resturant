import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import { Button } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PAGES_STACK, PAGES_TAB } from "@/constants/Pages";

export default function OrderConfirm() {
  const router = useRouter();
  const { orderID } = useLocalSearchParams();

  return (
    <ScrollView
      style={{
        backgroundColor: GlobalColors.primary,
      }}
    >
      <Pressable
        style={{
          marginLeft: 15,
          marginTop: 15,
        }}
        onPress={() => router.replace(PAGES_TAB.HOME_SCREEN)}
      >
        <AntDesign name="home" size={40} color={GlobalColors.themeColor} />
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("screen").height - 55,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            gap: 20,
            width: "100%",
            marginBottom: 55,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: 500,
              color: GlobalColors.themeColor,
            }}
          >
            Order Confirmed!
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Your order is confirmed. {"\n"} We are preparing it for delivery.
          </Text>
          <Image
            source={require("../../assets/images/order-confirm.webp")}
            style={{
              width: Dimensions.get("screen").width / 2,
              height: Dimensions.get("screen").width / 2,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Button
            status="danger"
            style={{
              width: "100%",
            }}
            onPress={() => router.replace(PAGES_TAB.HOME_SCREEN)}
          >
            Go to Home
          </Button>

          <Pressable
            onPress={() => router.replace({ pathname: PAGES_STACK.ORDERS_DETAILS, params: { OrderID: orderID } })}
          >
            <Text
              style={{
                textAlign: "center",
                textDecorationLine: "underline",
                color: GlobalColors.themeColor,
              }}
            >
              View Order Details
            </Text>
          </Pressable>
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              marginTop: -15,
            }}
          >
            {orderID}
          </Text>
        </View>
      </View>
    </ScrollView >
  );
}
