import React from "react";
import { Input, CheckBox, Text } from "@ui-kitten/components";
import { View } from "react-native";
import AutoCompleteCategory from "../../../Components/Modals/AutoCompleteCategory";

const ProductForm = ({
  Name,
  setName,
  Price,
  setPrice,
  CategorySelected,
  setCategorySelected,
  checked,
  setChecked,
  Error,
}) => {
  return (
    <View style={{ gap: 20 }}>
      {Error?.other && (
        <Text status="danger" style={{ fontWeight: 700 }}>
          {Error?.other}
        </Text>
      )}

      <Input
        value={Name}
        label="Product Name"
        placeholder="Enter product name"
        status={Error?.Name ? "danger" : "basic"}
        caption={
          Error?.Name && (
            <Text
              status="danger"
              style={{ fontSize: 13, fontWeight: 700, marginTop: 5 }}
            >
              {Error?.Name}
            </Text>
          )
        }
        onChangeText={(nextValue) => setName(nextValue)}
        size="large"
        style={{ elevation: 5 }}
      />

      <Input
        value={Price?.toString()}
        label="Product Price"
        placeholder="Enter product price"
        status={Error?.Price ? "danger" : "basic"}
        caption={
          Error?.Price && (
            <Text
              status="danger"
              style={{ fontSize: 13, fontWeight: 700, marginTop: 5 }}
            >
              {Error?.Price}
            </Text>
          )
        }
        onChangeText={(nextValue) => setPrice(nextValue)}
        size="large"
        style={{ elevation: 5 }}
      />

      <AutoCompleteCategory
        value={CategorySelected}
        setValue={setCategorySelected}
      />

      <CheckBox
        checked={checked}
        onChange={(nextChecked) => setChecked(nextChecked)}
        status="danger"
      >
        Mark as Popular product
      </CheckBox>
    </View>
  );
};

export default ProductForm;
