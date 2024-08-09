import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";

export async function deleteCategory({ itemKey = null }) {
  console.log("DELETING CATEGORY : ", itemKey);

  try {
    if (itemKey) {
      itemKey = JSON.stringify(itemKey);

      if (typeof itemKey !== "string") {
        throw new TypeError("Category Key must be a string");
      }

      const docRef = doc(firestoreDB, "ca8", itemKey);

      await deleteDoc(docRef);
      console.log("Category successfully deleted!");
    } else {
      throw new Error("Category Key not Found!");
    }
  } catch (error) {
    console.warn("Category Deleting Error => ", error);
  }
}
