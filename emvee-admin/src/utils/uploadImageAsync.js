import { ref, uploadBytes } from "firebase/storage";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import { fireStorage } from "../Infrastructure/firebase.config";

export const uploadImageAsync = async ({ uri, categoryID }) => {
  try {
    const convertedBlob = await manipulateAsync(
      uri,
      [{ resize: { width: 500, height: 500 } }],
      { compress: 1, format: SaveFormat.PNG }
    );

    const response = await fetch(convertedBlob.uri);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    const fileRef = ref(fireStorage, `ca/${categoryID}.png`);
    await uploadBytes(fileRef, blob);
  } catch (error) {
    console.log("Error uploading image:", error);
  }
};
