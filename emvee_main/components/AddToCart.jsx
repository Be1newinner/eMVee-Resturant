import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { addInCart } from "@/services/Slices/CartSlice";

export default function AddToCart({
  Quantity = 0,
  setQuantity = () => null,
  variant = 0,
  item,
  onClickAdd = () => null,
}) {
  const dispatch = useDispatch();
  return Quantity == 0 ? (
    <Button
      status="danger"
      onPress={() => {
        setQuantity(1);
      }}
    >
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
        onPress={() => {
          Quantity > 0 && item
            ? dispatch(
                addInCart({
                  ...item,
                  qty: Quantity - 1,
                  total: (Quantity - 1) * (item.pd ? item.pd : item.p),
                })
              )
            : setQuantity(Quantity - 1);
          onClickAdd();
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
                  total: (Quantity + 1) * (item.pd ? item.pd : item.p),
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
