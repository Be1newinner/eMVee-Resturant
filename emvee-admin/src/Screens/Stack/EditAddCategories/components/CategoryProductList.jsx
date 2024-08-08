import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductFlatList from "../../../BottomTabs/ProductsScreen/components/ProductFlatList";
import styles from "../styles";

const CategoryProductList = ({ navigation, productsSelector, category }) => {
  return (
    <View style={styles.productListContainer}>
      <View style={styles.productListHeader}>
        <Text style={styles.productListTitle}>Products in this Category</Text>
        <AntDesign
          name="pluscircle"
          size={28}
          onPress={() =>
            navigation.navigate("EditAddProducts", {
              product: {},
            })
          }
        />
      </View>
      <ProductFlatList
        smallView={true}
        SelectorData={productsSelector?.data?.filter(
          (item) => item.c === category.k
        )}
        deleteProduct={null}
        categorySelector={null}
        navigation={navigation}
      />
    </View>
  );
};

export { CategoryProductList };
