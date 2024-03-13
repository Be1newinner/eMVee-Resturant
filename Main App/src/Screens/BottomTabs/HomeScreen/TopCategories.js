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
import { TopCategoryList } from "../../../Services/OfflineDataToLive";

const ProductItems = () => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        style={styles.product}
        showsHorizontalScrollIndicator={false}
        data={TopCategoryList}
        horizontal
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigation.navigate("Burger", { item: item })}
            style={styles.imageList}
          >
            <Image style={styles.productImage} source={item.image} />
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
