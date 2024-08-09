import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";

export async function deleteProduct({ itemKey = null }) {
  console.log("DELETING ITEM: ", itemKey);

  try {
    if (itemKey) {
      itemKey = JSON.stringify(itemKey);

      if (typeof itemKey !== "string") {
        throw new TypeError("Item Key must be a string");
      }

      const docRef = doc(firestoreDB, "pr47", itemKey);

      await deleteDoc(docRef);
      console.log("Item successfully deleted!");
    } else {
      throw new Error("Item Key not Found!");
    }
  } catch (error) {
    console.warn("Product Deleting Error => ", error);
  }
}
