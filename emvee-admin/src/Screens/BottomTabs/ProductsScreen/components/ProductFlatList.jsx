import { FlatList, View } from "react-native";
import { ProductItem } from "./ProductItem";

export default function ProductFlatList({
  SelectorData,
  deleteProduct,
  categorySelector,
  navigation,
  smallView = false,
}) {
  console.log("PRODUCT DATA => ", SelectorData);
  return (
    <FlatList
      contentContainerStyle={{
        gap: 20,
        padding: 10,
      }}
      scrollEnabled={!smallView}
      initialNumToRender={6}
      ListHeaderComponent={<View style={{ marginTop: 10 }} />}
      ListFooterComponent={<View style={{ marginBottom: 80 }} />}
      data={SelectorData?.slice().sort((a, b) =>
        a.t < b.t ? -1 : a.t > b.t ? 1 : 0
      )}
      keyExtractor={(k) => k.k}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          deleteProduct={deleteProduct}
          categorySelector={categorySelector}
          navigation={navigation}
          smallView={smallView}
        />
      )}
    />
  );
}
