import { ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";
import { doc, setDoc } from "firebase/firestore";
import {
  addSingleProduct,
  editSingleProduct,
} from "../../../Services/Slices/AllProductsSlice";
import {
  fireStorage,
  firestoreDB,
} from "../../../Infrastructure/firebase.config";

export const uploadImageAsync = async ({ uri, productID }) => {
  try {
    if (uri.includes("https:")) return;
    console.log("IMG URI ", uri);
    const convertedBlob = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 500, height: 500 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    const response = await fetch(convertedBlob.uri);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    const fileRef = ref(fireStorage, `pa/${productID}.png`);
    await uploadBytes(fileRef, blob);
  } catch (error) {
    console.log("Error uploading image:", error);
    throw error;
  }
};

export const addProduct = async (
  product,
  image,
  imageError,
  dispatch,
  setError,
  navigation
) => {
  const error = {};

  if (product.t.length < 3) {
    error.Name = "Please provide a valid Name!";
  }

  if (!product.p) {
    error.Price = "Please Provide a price!";
  }

  setError(error);

  if (error?.Name || error?.Price) return;

  try {
    if (image) {
      console.log("Ready for Uplaoding Image");

      await uploadImageAsync({
        uri: image,
        productID: product.k,
      });
      product.i = true;
    } else {
      console.log("Not Ready for Uplaoding Image");
    }
  } catch (error) {
    console.log("Image Upload Error => ", error);
    return;
  }

  try {
    await setDoc(doc(firestoreDB, "pr47", product.k.toString()), product);
    if (product?.k) {
      dispatch(editSingleProduct(product));
    } else {
      dispatch(addSingleProduct(product));
    }
  } catch (error) {
    console.log("ADDING PRODUCT ERROR", error);
    return;
  }

  navigation.goBack();
};
