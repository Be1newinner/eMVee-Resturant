import React from "react";
import { Button } from "@ui-kitten/components";
import { View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({
  image: imageUri = "",
  setImage,
  setImageError,
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log("imageUri => ", imageUri);

  return (
    <View>
      <Button
        status="danger"
        size="small"
        style={{ maxWidth: 100, marginTop: 10 }}
        onPress={pickImage}
      >
        Pick Image
      </Button>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: imageUri ? 200 : 0,
            height: imageUri ? 200 : 0,
            objectFit: "contain",
            marginTop: 10,
          }}
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
};

export default ImagePickerComponent;
