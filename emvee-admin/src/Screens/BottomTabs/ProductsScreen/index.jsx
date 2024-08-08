import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import ProductFlatList from "./components/ProductFlatList";
import { deleteProduct } from "../../../utils/deleteProduct";
import SearchBarComponent from "../../../Components/SearchBarComponent";
import Header2 from "../../../Components/Header2";

export default function ProductsScreen({ navigation }) {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const [SearchInput, setSearchInput] = useState("");

  const sortedProducts = useMemo(() => {
    if (SearchInput?.length > 1) {
      const data = productsSelector?.data?.filter((e) =>
        e?.t?.toLowerCase().includes(SearchInput?.toLowerCase())
      );

      return data?.slice().sort((a, b) => {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        return 0;
      });
    } else
      return productsSelector?.data?.slice().sort((a, b) => {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        return 0;
      });
  }, [productsSelector?.data, SearchInput]);

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
      }}
    >
      <Header2
        title={`Total Products ${sortedProducts?.length}`}
        rightIcon={
          <AntDesign
            name="pluscircle"
            size={28}
            onPress={() =>
              navigation.navigate("EditAddProducts", {
                product: {},
              })
            }
          />
        }
      />

      <SearchBarComponent
        value={SearchInput}
        setValue={setSearchInput}
        style={{
          marginBottom: -20,
          marginTop: 90,
        }}
      />

      <ProductFlatList
        SelectorData={sortedProducts}
        deleteProduct={deleteProduct}
        categorySelector={categorySelector}
        navigation={navigation}
      />
    </View>
  );
}
