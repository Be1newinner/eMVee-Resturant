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
import { useSelector } from "react-redux";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";

const ProductItems = () => {
  const navigation = useNavigation();
  const TotalCategoryList = useSelector((state) => state.AllCategories);
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          gap: 20,
        }}
        showsHorizontalScrollIndicator={false}
        data={TotalCategoryList?.data?.filter((e) => e.s === true)}
        horizontal
        keyExtractor={(e) => e.k}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("CategoryItems", { category: item })
            }
            style={{
              maxWidth: 100,
              alignItems: "center",
            }}
          >
            {item.i ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={item.i}
              />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: GlobalColors.themeColor,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {item.t.slice(0, 1)}
                </Text>
              </View>
            )}
            <Text style={{ marginTop: 10, fontSize: 12, textAlign: "center" }}>
              {item.t}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ProductItems;
