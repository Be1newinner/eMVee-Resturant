import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useSelector } from "react-redux";

const PopularList = ({ children, navigation }) => {
  const PopularItems = useSelector((state) => state.AllProducts);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={PopularItems.filter((e) => e.s === true)}
      numColumns={2}
      ListHeaderComponent={children}
      contentContainerStyle={{
        gap: 10,
        paddingBottom: 50,
      }}
      ListFooterComponent={
        <View
          style={{
            height: 50,
          }}
        ></View>
      }
      renderItem={({ item, index }) => (
        <Pressable
          style={[
            styles.popularItems,
            {
              marginRight: index % 2 ? 10 : 0,
              marginLeft: 10,
              gap: 5,
            },
          ]}
          onPress={() =>
            navigation.navigate("ProductDetail", { product: item })
          }
        >
          <Image
            style={{
              width: "100%",
              height: 130,
              resizeMode: "cover",
              borderRadius: 10,
            }}
            source={item.i}
          />
          <Text style={{ fontSize: 17, fontWeight: "500", marginLeft: 5 }}>
            {item.t}
          </Text>
          <Text style={{ fontSize: 12, opacity: 0.7, marginLeft: 5 }}>
            {item.v}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color: GlobalColors.themeColor,
              marginLeft: 5,
            }}
          >
            ₹{item.p}/-
          </Text>
        </Pressable>
      )}
    />
  );
};

export default PopularList;

const styles = StyleSheet.create({
  popularItems: {
    flex: 1,
    borderColor: "#c2c0c0",
    borderWidth: 0.5,
    padding: 6,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
  },
});
