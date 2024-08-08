import { uploadImageAsync } from "./uploadImageAsync";
import { firestoreDB } from "../Infrastructure/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import {
  addSingleCategory,
  editSingleCategory,
} from "../Services/Slices/AllCategoriesSlice";

export const addCategory = async ({
  validateForm,
  SelectedCategoryData,
  image,
  imageError,
  dispatch,
  navigation,
  category,
}) => {
  const error = validateForm();
  if (error) return;

  const categoryData = {
    t: SelectedCategoryData.Name,
    s: SelectedCategoryData.checked || false,
  };

  const categoryID = category?.k || Date.now().toString();

  if (image && !imageError) {
    try {
      await uploadImageAsync({ uri: image, categoryID });
      categoryData.i = true;
    } catch (error) {
      console.error("Image Upload Error:", error);
      return;
    }
  }

  try {
    await setDoc(doc(firestoreDB, "ca8", categoryID), categoryData);
    dispatch(
      category?.k
        ? editSingleCategory({ ...categoryData, k: categoryID })
        : addSingleCategory({ ...categoryData, k: categoryID })
    );
    navigation.goBack();
  } catch (error) {
    console.error("Error adding category:", error);
  }
};
