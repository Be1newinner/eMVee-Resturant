import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  EditHeader,
  ErrorMessage,
  CategoryForm,
  CategoryProductList,
  FooterButtons,
} from "./components";

import { addCategory } from "../../../utils/addCategory";
import styles from "./styles";

const EditAddCategories = ({ navigation, route }) => {
  const [Name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const productsSelector = useSelector((state) => state.AllProducts);
  const dispatch = useDispatch();
  const { category } = route.params;

  useEffect(() => {
    if (category) {
      setName(category.t || "");
      setChecked(category.s || false);
      setImage(
        `https://firebasestorage.googleapis.com/v0/b/emvee-resturant.appspot.com/o/ca%2F${category.k}.png?alt=media`
      );
    } else {
      resetForm();
    }
  }, [category]);

  const resetForm = () => {
    setName("");
    setChecked(false);
    setError("");
    setImage(null);
  };

  const validateForm = () => {
    if (Name.length < 3) {
      setError({ Name: "Please provide a valid Name!" });
      return true;
    }
    setError("");
    return false;
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <EditHeader category={category} />
          <ErrorMessage error={Error.other} />
          <CategoryForm
            Name={Name}
            setName={setName}
            checked={checked}
            setChecked={setChecked}
            Error={Error}
            image={image}
            setImage={setImage}
            setImageError={setImageError}
          />
          <CategoryProductList
            navigation={navigation}
            productsSelector={productsSelector}
            category={category}
          />
        </View>
      </ScrollView>
      <FooterButtons
        navigation={navigation}
        onPressSave={() =>
          addCategory({
            validateForm,
            SelectedCategoryData: {
              Name,
              checked,
            },
            image,
            imageError,
            dispatch,
            navigation,
            category,
          })
        }
        isEditing={!!category}
      />
    </View>
  );
};

export default EditAddCategories;
