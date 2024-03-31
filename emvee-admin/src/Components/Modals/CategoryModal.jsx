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
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { fireStorage, firestoreDB } from "../../Infrastructure/firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
  addSingleCategory,
  editSingleCategory,
} from "../../Services/Slices/AllCategoriesSlice";

export const CategoryModal = ({
  visible,
  setVisible,
  category = null,
  setCategory = () => null,
}) => {
  const [Name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      const itemKey = category?.k;
      if (category?.t) setName(category.t);
      if (category?.s) setChecked(category.s);

      setImage(
        `https://firebasestorage.googleapis.com/v0/b/emvee-resturant.appspot.com/o/ca%2F${itemKey}.png?alt=media`
      );
    } else {
      setName("");
      setChecked(false);
      setError("");
      setImage(null);
    }
  }, [category]);

  useEffect(() => {
    setImageError(false);
  }, [image]);

  async function uploadImageAsync({ uri, categoryID }) {
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
  }

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

  async function addCategory() {
    const error = {};

    if (Name.length < 3) {
      error.Name = "Please provide a valid Name!";
    }

    setError(error);

    if (error?.Name) {
      return;
    }

    const myObject = {
      t: Name,
    };

    if (checked) {
      myObject.s = true;
    }

    let categoryID;

    if (category?.k) categoryID = category?.k;
    else categoryID = Date.now();

    try {
      await setDoc(doc(firestoreDB, "ca8", categoryID.toString()), myObject);
    } catch (error) {
      console.log("ADDING CATEGORY ERROR 1", error);
      return;
    }

    try {
      if (category?.k) {
        dispatch(editSingleCategory({ ...myObject, k: categoryID }));
      } else dispatch(addSingleCategory({ ...myObject, k: categoryID }));
    } catch (error) {
      console.log("ADDING CATEGORY ERROR 2", error);
      return;
    }
    try {
      if (image && !imageError) {
        await uploadImageAsync({
          uri: image,
          categoryID,
        });
      }
    } catch (error) {
      console.log("Image Upload Error => ", error);
      return;
    }

    closingModal(null);
  }

  const closingModal = () => {
    setName("");
    setChecked(false);
    setError("");
    setImage(null);
    setVisible(false);
    setCategory(null);
    setImageError(false);
    // console.log("closing modal ");
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
            {category ? "Edit" : "Add New"} Category
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
            label="Category Name"
            placeholder="enter category name"
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
            Mark as Popular Category
          </CheckBox>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: !imageError ? 200 : 0,
                height: !imageError ? 200 : 0,
                objectFit: "contain",
                marginTop: 10,
              }}
              onError={() => {
                setImageError(true);
                // console.log("SET IMAGE ERROR TO FALSE!");
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
            onPress={() => closingModal()}
            style={{
              flex: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              addCategory();
            }}
            status="danger"
            style={{
              flex: 1,
            }}
          >
            {category ? "Save" : "Add"} Category
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
