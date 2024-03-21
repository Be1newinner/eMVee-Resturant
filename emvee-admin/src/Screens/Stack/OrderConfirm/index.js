import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { Button } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";

export default function OrderConfirm({ navigation }) {
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
        onPress={() => navigation.replace("BottomTab")}
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
            source={require("../../../../assets/images/order-confirm.webp")}
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
            onPress={() => navigation.replace("BottomTab")}
          >
            Go to Home
          </Button>

          <Pressable>
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
        </View>
      </View>
    </ScrollView>
  );
}
