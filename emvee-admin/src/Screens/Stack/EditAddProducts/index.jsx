import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "./ProductForm";
import ImagePickerComponent from "./ImagePickerComponent";
import { addProduct } from "./ProductActions";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";

const EditAddProducts = ({ navigation, route }) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(null);
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [CategorySelected, setCategorySelected] = useState(null);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const categorySelector = useSelector((selector) => selector.AllCategories);

  const { product } = route.params;

  useEffect(() => {
    if (product) {
      const itemKey = product?.k;
      if (product?.t) setName(product.t);
      if (product?.s) setChecked(product.s);
      if (product.p) setPrice(product.p);
      if (product?.c) {
        const data = categorySelector?.data?.filter((e) => e.k == product.c)[0];
        setCategorySelected(data);
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
  }, [product]);

  const clearingData = () => {
    setName("");
    setChecked(false);
    setError("");
    setImage(null);
    setImageError(false);
    setPrice(null);
    setCategorySelected(null);
  };

  return (
    <View
      style={{
        gap: 10,
        padding: 20,
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        {Object.keys(product).length ? "Edit" : "Add New"} product
      </Text>

      <ProductForm
        Name={Name}
        setName={setName}
        Price={Price}
        setPrice={setPrice}
        CategorySelected={CategorySelected}
        setCategorySelected={setCategorySelected}
        checked={checked}
        setChecked={setChecked}
        Error={Error}
      />

      <ImagePickerComponent
        image={image}
        setImage={setImage}
        setImageError={setImageError}
      />

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 20,
          gap: 10,
          left: 20,
        }}
      >
        <Button
          status="basic"
          onPress={() => navigation.goBack()}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#afafaf",
          }}
        >
          Cancel
        </Button>
        <Button
          onPress={() =>
            addProduct(
              {
                t: Name,
                p: Price,
                c: CategorySelected?.k,
                s: checked,
                k: product?.k || Date.now(),
              },
              image,
              imageError,
              dispatch,
              setError,
              navigation
            )
          }
          status="danger"
          style={{ flex: 1 }}
        >
          {product?.t ? "Save Changes" : "Add product"}
        </Button>
      </View>
    </View>
  );
};

export default EditAddProducts;
