import { Alert } from "react-native";
import { deleteProduct } from "./deleteProduct";
import { deleteCategory } from "./deleteCategory";
import { deleteSingleCategory } from "../redux/actions/allCategories";
import { deleteSingleProduct } from "../redux/actions/allProducts";

interface propType {
  k: string;
  t: string;
}

export const onLongPress = (
  item: propType,
  selection: string = "product",
  dispatch: any
) => {
  Alert.alert(
    "Delete",
    `Are you sure you want to delete ${
      selection == "category" ? "category" : "item"
    } number ${item.k} ${item.t || ""}?`,
    [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          switch (selection) {
            case "category": {
              await deleteCategory({ itemKey: item.k });
              dispatch(deleteSingleCategory(item));
              break;
            }
            case "product": {
              await deleteProduct({ itemKey: item.k });
              dispatch(deleteSingleProduct(item));
              break;
            }
            default:
              console.warn(
                "Please Pass Proper selection parameter in onLongPress method"
              );
          }
        },
      },
    ]
  );
};
