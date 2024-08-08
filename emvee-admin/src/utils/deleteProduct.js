import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";

export async function deleteProduct({ itemKey = null }) {
  try {
    if (itemKey != null) {
      console.log("DELETING ITEM : ", itemKey);
      await deleteDoc(doc(firestoreDB, "pr47", itemKey));
    } else {
      throw "Item Key not Found!";
    }
  } catch (error) {
    console.warn("Product Deleting Error => ", error);
  }
}
