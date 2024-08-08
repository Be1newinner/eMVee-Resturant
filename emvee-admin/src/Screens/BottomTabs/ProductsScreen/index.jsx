import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import Header from "../../../Components/Header";
import ProductFlatList from "./components/ProductFlatList";
import { deleteProduct } from "../../../utils/deleteProduct";

export default function ProductsScreen({ navigation }) {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
      }}
    >
      <Header
        title={"Total Products"}
        SelectorData={productsSelector?.data}
        navigation={navigation}
        nextScteen={"EditAddProducts"}
      />
      <ProductFlatList
        SelectorData={productsSelector?.data}
        deleteProduct={deleteProduct}
        categorySelector={categorySelector}
        navigation={navigation}
      />
    </View>
  );
}
