import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

import { getImageURL } from "@/services/offline/Image";
import { PAGES_STACK } from "../constants/Pages";
import { GlobalColors } from "../infrastructure/GlobalVariables";
import AntDesign from "@expo/vector-icons/AntDesign";

const PopularList = ({ children }) => {
  const router = useRouter();
  const PopularItems = useSelector((state) => state.AllProducts);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={PopularItems?.data?.filter((e) => e.s === true)}
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
        />
      }
      renderItem={({ item, index }) => {
        // console.log("IMAGE => ", getImageURL(item.k));
        // console.log(item)
        return (
          <Pressable
            style={[
              styles.popularItems,
              {
                marginRight: index % 2 ? 10 : 0,
                marginLeft: 10,
                gap: 5,
                maxWidth: Dimensions.get("screen").width / 2 - 15,
              },
            ]}
            onPress={() => {
              console.log(item);
              router.push({
                pathname: PAGES_STACK.PRODUCT_DETAIL,
                params: { productId: item.k },
              });
            }}
          >
            {item.i ? (
              <Image
                style={{
                  width: "100%",
                  height: 130,
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
                source={{ uri: getImageURL(item.k) }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 130,
                  resizeMode: "cover",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                  }}
                >
                  {item.t.slice(0, 1)}
                </Text>
              </View>
            )}
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                marginLeft: 5,
                flex: 1,
              }}
            >
              {item.t}
            </Text>
            {item.v && (
              <Text style={{ fontSize: 12, opacity: 0.7, marginLeft: 5 }}>
                {item.v}
              </Text>
            )}
            {item.pd ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <AntDesign
                  name="arrowdown"
                  size={16}
                  color={
                    Math.round((item.pd / item.p) * 100) > 100
                      ? GlobalColors.themeColor
                      : GlobalColors.discountPercent
                  }
                />
                <Text
                  style={{
                    fontWeight: "900",
                    color:
                      Math.round((item.pd / item.p) * 100) > 100
                        ? GlobalColors.themeColor
                        : GlobalColors.discountPercent,
                    marginLeft: 5,
                  }}
                >
                  {Math.round((item.pd / item.p) * 100)}%
                </Text>

                <Text
                  style={{
                    fontWeight: "900",
                    marginLeft: 5,
                    textDecorationLine: "line-through",
                    color: GlobalColors.discountPricing,
                  }}
                >
                  ₹{item.p}/-
                </Text>

                <Text
                  style={{
                    fontWeight: "900",
                    marginLeft: 5,
                  }}
                >
                  ₹{item.pd}/-
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontWeight: "500",
                  marginLeft: 5,
                }}
              >
                ₹{item.p}/-
              </Text>
            )}
          </Pressable>
        );
      }}
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
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.8,
    shadowRadius: 16,
  },
});
