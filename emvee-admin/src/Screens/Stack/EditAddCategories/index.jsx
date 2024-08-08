import React, { useEffect, useState } from "react";
import { Button, CheckBox, Input, Text } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

import { firestoreDB } from "../../../Infrastructure/firebase.config";
import {
  addSingleCategory,
  editSingleCategory,
} from "../../../Services/Slices/AllCategoriesSlice";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import ImagePicker from "./ImagePicker";
import Header from "./Header";
import ErrorMessage from "./ErrorMessage";
import { uploadImageAsync } from "../../../utils/uploadImageAsync";
import ProductFlatList from "../../BottomTabs/ProductsScreen/components/ProductFlatList";

const EditAddCategories = ({ navigation, route }) => {
  const [Name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const productsSelector = useSelector((selector) => selector.AllProducts);

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
      setName("");
      setChecked(false);
      setError("");
      setImage(null);
    }
  }, [category]);

  console.log("category =<> ", category);

  const addCategory = async () => {
    const error = {};
    if (Name.length < 3) {
      error.Name = "Please provide a valid Name!";
    }
    setError(error);
    if (error.Name) return;

    const categoryData = { t: Name, s: checked || false };

    let categoryID = category?.k || Date.now().toString();

    if (image && !imageError) {
      try {
        await uploadImageAsync({ uri: image, categoryID });
        categoryData.i = true;
      } catch (error) {
        console.log("Image Upload Error => ", error);
        return;
      }
    }

    try {
      await setDoc(doc(firestoreDB, "ca8", categoryID), categoryData);
      if (category?.k) {
        dispatch(editSingleCategory({ ...categoryData, k: categoryID }));
      } else {
        dispatch(addSingleCategory({ ...categoryData, k: categoryID }));
      }
      navigation.goBack();
    } catch (error) {
      console.log("Error adding category:", error);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Header category={category} />
          <ErrorMessage error={Error.other} />
          <Input
            value={Name}
            label="Category Name"
            placeholder="Enter category name"
            status={Error.Name ? "danger" : "basic"}
            caption={Error.Name && <Text status="danger">{Error.Name}</Text>}
            onChangeText={(nextValue) => setName(nextValue)}
            size="large"
            style={styles.input}
          />
          <CheckBox
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
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

          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.5)",
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                margin: 10,
                marginBottom: -30,
                fontWeight: "900",
                fontSize: 18,
              }}
            >
              Products in this Category
            </Text>

            <ProductFlatList
              smallView={true}
              SelectorData={productsSelector?.data?.filter(
                (item) => item.c == category.k
              )}
              deleteProduct={null}
              categorySelector={null}
              navigation={navigation}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          status="basic"
          onPress={() => navigation.goBack()}
          style={[
            styles.button,
            {
              borderColor: "rgba(255,0,0,0.5)",
            },
          ]}
        >
          Cancel
        </Button>
        <Button onPress={addCategory} status="danger" style={styles.button}>
          {category ? "Save" : "Add"} Category
        </Button>
      </View>
    </View>
  );
};

const styles = {
  MainContainer: {
    flex: 1,
  },
  container: {
    gap: 10,
    padding: 20,
    flex: 1,
    backgroundColor: GlobalColors.primary,
    position: "relative",
  },
  input: {
    elevation: 5,
  },
  checkbox: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    gap: 10,
    left: 10,
    right: 10,
  },
  button: {
    flex: 1,
  },
};

export default EditAddCategories;
