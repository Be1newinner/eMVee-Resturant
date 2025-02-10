import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { TopViewHome } from "../../../components/TopViewHome";
import { GlobalColors } from "../../../infrasrtructure/GlobalVariables";
import { useSelector } from "react-redux";
import { getCategoryImageURL } from "../../../services/offline/Image";
import { useRouter } from "expo-router";
import { PAGES_STACK } from "../../../constants/Pages";

const CategoryScreen = () => {
  const TotalCategoryList = useSelector((state) => state.AllCategories);
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
      }}
    >
      <FlatList
        data={TotalCategoryList?.data}
        numColumns={2}
        contentContainerStyle={{
          rowGap: 10,
          paddingBottom: 40,
        }}
        ListFooterComponent={
          <View
            style={{
              height: 50,
            }}
          ></View>
        }
        keyExtractor={(e) => e.k}
        ListHeaderComponent={
          <View>
            <TopViewHome />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              Order from our curated categories
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              console.log("DATA => ", item)
              router.push({
                pathname: PAGES_STACK.CATEGORY_ITEMS, params: {
                  category: JSON.stringify(item)
                }
              })
            }}
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginLeft: 10,
              marginRight: index % 2 ? 10 : 0,
            }}
          >
            <View
              style={{
                color: "black",
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  textAlign: "center",
                  marginRight: 13,
                  fontWeight: "600",
                }}
              >
                {item.t}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              {item.i ? (
                <Image
                  style={{
                    width: Dimensions.get("screen").width / 2 - 17,
                    height: Dimensions.get("screen").width / 2 - 17,
                    borderRadius: 10,
                  }}
                  source={{ uri: getCategoryImageURL(item.k) }}
                />
              ) : (
                <View
                  style={{
                    width: Dimensions.get("screen").width / 2 - 17,
                    height: Dimensions.get("screen").width / 2 - 17,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryScreen;
