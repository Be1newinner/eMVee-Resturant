import React from "react";
import { View } from "react-native";
import { Input, CheckBox, Text } from "@ui-kitten/components";
import { ImagePicker } from "./ImagePicker";
import styles from "../styles";

const CategoryForm = ({
  Name,
  setName,
  checked,
  setChecked,
  Error,
  image,
  setImage,
  setImageError,
}) => {
  return (
    <View style={styles.formContainer}>
      <Input
        value={Name}
        label="Category Name"
        placeholder="Enter category name"
        status={Error.Name ? "danger" : "basic"}
        caption={Error.Name && <Text status="danger">{Error.Name}</Text>}
        onChangeText={setName}
        size="large"
        style={styles.input}
      />
      <CheckBox
        checked={checked}
        onChange={setChecked}
        style={styles.checkbox}
        status="danger"
      >
        Mark as Popular Category
      </CheckBox>
      <ImagePicker
        image={image}
        setImage={setImage}
        setImageError={setImageError}
      />
    </View>
  );
};

export { CategoryForm };
