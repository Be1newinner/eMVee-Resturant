import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TotalCategoryList } from "../../../Services/OfflineDataToLive";

const ProductItems = () => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        style={styles.product}
        showsHorizontalScrollIndicator={false}
        data={TotalCategoryList.filter((e) => e.p === true)}
        horizontal
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("CategoryItems", { category: item })
            }
            style={styles.imageList}
          >
            <Image
              style={styles.productImage}
              source={item.image}
            />
            <Text style={{ marginTop: 10, fontSize: 12 }}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ProductItems;

const styles = StyleSheet.create({
  imageList: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  productImage: {
    width: 50,
    height: 45,
  },
});
