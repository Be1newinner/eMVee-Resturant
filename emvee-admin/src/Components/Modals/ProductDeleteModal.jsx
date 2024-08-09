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
import { fireStorage, firestoreDB } from "../../Infrastructure/firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleProduct,
  editSingleProduct,
} from "../../redux/Slices/AllProductsSlice";
import AutoCompleteCategory from "./AutoCompleteCategory";

export const ProductDeleteModal = ({
  visible,
  setVisible,
  product = null,
  setProduct = () => null,
}) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(null);
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [CategorySelected, setCategorySelected] = useState(null);
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      const itemKey = product?.k;
      if (product?.t) setName(product.t);
      if (product?.s) setChecked(product.s);
      if (product.p) setPrice(product.p);
      if (product?.c) {
        const data = categorySelector?.data?.filter((e) => e.k == product.c)[0];
        setCategorySelected(data);
        console.log("THE DATA ", data, product.p);
      }
      setImage(
        `https://firebasestorage.googleapis.com/v0/b/emvee-resturant.appspot.com/o/pa%2F${itemKey}.png?alt=media`
      );
    } else {
      setName("");
      setChecked(false);
      setError("");
      setImage(null);
      setPrice(null);
      setCategorySelected(null);
    }

    // console.log(product);
  }, [product]);

  async function uploadImageAsync({ uri, productID }) {
    try {
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

  async function addProduct() {
    const error = {};

    if (Name.length < 3) {
      error.Name = "P lease provide a valid Name!";
    }

    if (!Price) {
      error.Price = "Please Provide a price!";
    }

    setError(error);

    if (error?.Name || error?.Price) return;

    const myObject = {
      t: Name,
      p: Price,
      c: CategorySelected?.k,
    };

    if (checked) myObject.s = true;

    if (product?.k) myObject.k = product?.k;
    else myObject.k = Date.now();

    try {
      if (image && !imageError) {
        await uploadImageAsync({
          uri: image,
          productID: myObject.k,
        });
        myObject.i = true;
      }
    } catch (error) {
      console.log("Image Upload Error => ", error);
      return;
    }

    try {
      await setDoc(doc(firestoreDB, "pr47", myObject.k.toString()), myObject);
    } catch (error) {
      console.log("ADDING CATEGORY ERROR 1", error);
      return;
    }
    try {
      if (product?.k) {
        dispatch(editSingleProduct(myObject));
      } else dispatch(addSingleProduct(myObject));
    } catch (error) {
      console.log("ADDING CATEGORY ERROR 2", error);
      return;
    }

    closingModal();
  }

  const closingModal = () => {
    setName("");
    setChecked(false);
    setError("");
    setImage(null);
    setVisible(false);
    setProduct(null);
    setImageError(false);
    setPrice(null);
    setCategorySelected(null);
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

        <View
          style={{
            gap: 20,
          }}
        >
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
            label="Product Name"
            placeholder="Enter product name"
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
          <Input
            value={Price?.toString()}
            label="Product Price"
            placeholder="Enter product price"
            status={Error?.Price ? "danger" : "basic"}
            caption={
              Error?.Price &&
              (() => (
                <Text
                  status="danger"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginTop: 5,
                  }}
                >
                  {Error?.Price}
                </Text>
              ))
            }
            onChangeText={(nextValue) => setPrice(nextValue)}
            size="large"
            style={{
              elevation: 5,
            }}
          />

          <AutoCompleteCategory
            value={CategorySelected}
            setValue={(item) => setCategorySelected(item)}
          />

          <CheckBox
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
            status="danger"
          >
            Mark as Popular product
          </CheckBox>
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
              addProduct();
            }}
            status="danger"
            style={{
              flex: 1,
            }}
          >
            {product?.t ? "Save Changes" : "Add product"}
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
