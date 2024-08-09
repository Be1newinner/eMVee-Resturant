import { Alert } from "react-native";
import { deleteProduct } from "./deleteProduct";

interface propType {
  k: string;
  t: string;
}

export const onLongPress = (item: propType) => {
  Alert.alert(
    "Delete",
    `Are you sure you want to delete item number ${item.k} ${item.t || ""}?`,
    [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => deleteProduct({ itemKey: item.k }),
      },
    ]
  );
};
