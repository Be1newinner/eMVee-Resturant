import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CheckBox,
  Input,
  Modal,
  Text,
} from "@ui-kitten/components";
import { Dimensions, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { fireStorage } from "../../Infrastructure/firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

export const ProductsModal = ({
  visible,
  setVisible,
  product = null,
  setproduct = () => null,
}) => {
  const [Name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      if (product?.t) setName(product.t);
      if (product?.s) setChecked(product.s);
    } else {
      setName("");
      setChecked(false);
      setError("");
      setImage(null);
    }

    // console.log(product);
  }, [product]);

  async function uploadImageAsync({ uri, productID }) {
    try {
      const convertedBlob = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG } // Adjust format if needed
      );

      const response = await fetch(convertedBlob.uri);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const fileRef = ref(fireStorage, "ca", productID, 1);
      await uploadBytes(fileRef, blob);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

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

  // const addNewproduct = () => {};

  async function addproduct() {
    closingModal(null);
  }

  const closingModal = () => {
    setName("");
    setChecked(false);
    setError("");
    setImage(null);
    setVisible(false);
    setproduct(null);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onBackdropPress={closingModal}
    >
      <Card
        style={{
          width: Dimensions.get("screen").width,
          gap: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {product ? "Edit" : "Add New"} product
          </Text>
        </View>

        <View>
          {Error?.other && (
            <Text
              status="danger"
              style={{
                fontWeight: 700,
              }}
            >
              {Error?.other}
            </Text>
          )}

          <Input
            value={Name}
            label="product Name"
            placeholder="enter product name"
            // accessoryLeft={() => <Entypo name="email" size={24} color="black" />}
            status={Error?.Name ? "danger" : "basic"}
            caption={
              Error?.Name &&
              (() => (
                <Text
                  status="danger"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginTop: 5,
                  }}
                >
                  {Error?.Name}
                </Text>
              ))
            }
            onChangeText={(nextValue) => setName(nextValue)}
            size="large"
            style={{
              elevation: 5,
            }}
          />
          <CheckBox
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
            style={{
              marginTop: 20,
            }}
            status="danger"
          >
            Mark as Popular product
          </CheckBox>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginTop: 10,
              }}
            />
          )}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
              status="danger"
              size="small"
              style={{
                maxWidth: 100,
                marginTop: 10,
              }}
              onPress={pickImage}
            >
              Pick Image
            </Button>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            width: "auto",
            marginTop: 20,
          }}
        >
          <Button
            status="basic"
            onPress={() => setVisible(false)}
            style={{
              flex: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              addproduct();
            }}
            status="danger"
            style={{
              flex: 1,
            }}
          >
            Add product
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
