import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function AddToCart2({
  Quantity = 0,
  setQuantity = () => null,
  variant = 0,
}) {
  return Quantity == 0 ? (
    <Pressable
      style={{
        borderColor: "#e34",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: -28,
        paddingVertical: 5,
        backgroundColor: "rgb(240,220,220)",
      }}
    >
      <Text
        style={{
          color: "#e34",
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 2,
        }}
      >
        ADD +
      </Text>
    </Pressable>
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
