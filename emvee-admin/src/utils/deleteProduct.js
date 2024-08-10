import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";

export async function deleteProduct({ itemKey = null }) {
  console.log("DELETING Product : ", itemKey);

  try {
    if (!itemKey) throw new Error("Product Key not Found!");

    if (!["number", "string"].includes(typeof itemKey))
      throw new Error("Product Key must be a string or number");

    const docRef = doc(firestoreDB, "pr47", itemKey);

    await deleteDoc(docRef);
    console.log("Product successfully deleted!");
  } catch (error) {
    console.warn("Product Deleting Error => ", error);
  }
}
