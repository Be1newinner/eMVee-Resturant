import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";

export async function deleteCategory({ itemKey = null }) {
  console.log("DELETING CATEGORY : ", itemKey);

  try {
    if (!itemKey) throw new Error("Category Key not Found!");

    if (!["number", "string"].includes(typeof itemKey))
      throw new Error("Category Key must be a string or number");

    const docRef = doc(firestoreDB, "ca8", itemKey);

    await deleteDoc(docRef);
    console.log("Category successfully deleted!");
  } catch (error) {
    console.warn("Category Deleting Error => ", error);
  }
}
