import React from "react";
import { Image, View } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { Button } from "@ui-kitten/components";

const ImagePicker = ({ image, setImage, setImageError }) => {
  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // console.log("image => ", image);

  return (
    <View>
      <Button status="danger" onPress={pickImage} style={styles.button}>
        Pick Image
      </Button>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
};

const styles = {
  image: {
    width: 200,
    height: 200,
    objectFit: "contain",
    marginTop: 10,
  },
  button: {
    maxWidth: 200,
    marginTop: 10,
  },
};

export { ImagePicker };
