import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";

export default function AddToCart({
  Quantity = 0,
  setQuantity = () => null,
  variant = 0,
}) {
  return Quantity == 0 ? (
    <Button style={{}} status="danger" onPress={() => setQuantity(1)}>
      Add to Cart
    </Button>
  ) : (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Pressable
        style={{
          borderWidth: 1,
          width: variant == 0 ? 40 : 24,
          height: variant == 0 ? 40 : 24,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          backgroundColor: "#fff",
          elevation: 3,
          borderColor: "#406090",
        }}
        onPress={() => Quantity > 0 && setQuantity(Quantity - 1)}
      >
        <Feather name="minus" size={variant == 0 ? 26 : 14} color="#406090" />
      </Pressable>
      <View
        style={{
          width: variant == 0 ? 40 : 24,
          height: variant == 0 ? 40 : 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: variant == 0 ? 22 : 16,
            fontWeight: 600,
            color: "#406090",
          }}
        >
          {Quantity}
        </Text>
      </View>
      <Pressable
        style={{
          borderWidth: 1,
          width: variant == 0 ? 40 : 24,
          height: variant == 0 ? 40 : 24,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          backgroundColor: "#fff",
          elevation: 3,
          borderColor: "#406090",
        }}
        onPress={() => setQuantity(Quantity + 1)}
      >
        <Feather name="plus" size={variant == 0 ? 26 : 14} color="#406090" />
      </Pressable>
    </View>
  );
}
