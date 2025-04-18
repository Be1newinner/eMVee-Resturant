import { Button } from "@ui-kitten/components";
import { Dimensions, Text, View } from "react-native";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { PAGES_TAB } from "../constants/Pages";

export default function BottomOrderBar({ bottom = 20 }) {
  const selector = useSelector((state) => state.Cart);
  const navigation = useRouter();
  const totalData = {
    price: selector.subtotal,
    items: selector.qty,
  };

  return selector.qty ? (
    <View
      style={{
        width: Dimensions.get("screen").width - 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.3)",
        backgroundColor: "#fff",
        position: "absolute",
        bottom,
        elevation: 5,
        margin: 10,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: GlobalColors.productText,
          }}
        >
          Total ₹{totalData.price}/- & {totalData.items}
          {totalData.items == 1 ? "item" : "items"}
        </Text>
      </View>

      <Button
        status="danger"
        style={{
          width: 120,
        }}
        onPress={() => navigation.navigate(PAGES_TAB.CART_SCREEN)}
      >
        View Cart
      </Button>
    </View>
  ) : null;
}
