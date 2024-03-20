import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { TopViewHome } from "../../../Components/TopViewHome";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useSelector } from "react-redux";

const CategoryScreen = ({ navigation }) => {
  const TotalCategoryList = useSelector((state) => state.AllCategories);

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
      }}
    >
      <FlatList
        data={TotalCategoryList}
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
            <TopViewHome navigation={navigation} />
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
            onPress={() =>
              navigation.navigate("CategoryItems", { category: item })
            }
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
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textAlign: "center",
                  marginRight: 13,
                }}
              >
                {item.t}
              </Text>
            </View>
            <View
              style={{
                // elevation: 5,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Image
                style={{
                  width: Dimensions.get("screen").width / 2 - 17,
                  height: Dimensions.get("screen").width / 2 - 17,
                  borderRadius: 10,
                  backgroundColor: "rgba(240,48,64,0.15)",
                }}
                source={item.i}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryScreen;
