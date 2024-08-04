import { Text, View, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { GlobalColors } from "@/Infrastructure/GlobalVariables";
import { getCategoryImageURL } from "@/Services/offline/Image";

const ProductItems = () => {
  const navigation = useNavigation();
  const TotalCategoryList = useSelector((state) => state.AllCategories);
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          gap: 5,
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
              maxWidth: 60,
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            {item.i ? (
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                }}
                source={{ uri: getCategoryImageURL(item.k) }}
              />
            ) : (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: GlobalColors.themeColor,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 60,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 38,
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
