import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { addInCart } from "@/services/Slices/CartSlice";
import { useDispatch } from "react-redux";

export default function AddToCart2({
  Quantity = 0,
  setQuantity = () => null,
  variant = 0,
  item,
}) {
  const dispatch = useDispatch();

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
        minWidth: 100,
      }}
      onPress={() => {
        item
          ? dispatch(
              addInCart({
                ...item,
                qty: 1,
                total: item.p,
              })
            )
          : setQuantity(1);
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
        onPress={() => {
          Quantity > 0 && item
            ? dispatch(
                addInCart({
                  ...item,
                  qty: Quantity - 1,
                  total: (Quantity - 1) * item.p,
                })
              )
            : setQuantity(Quantity - 1);
        }}
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
        onPress={() => {
          item
            ? dispatch(
                addInCart({
                  ...item,
                  qty: Quantity + 1,
                  total: (Quantity + 1) * item.p,
                })
              )
            : setQuantity(Quantity + 1);
        }}
      >
        <Feather name="plus" size={variant == 0 ? 26 : 14} color="#406090" />
      </Pressable>
    </View>
  );
}
