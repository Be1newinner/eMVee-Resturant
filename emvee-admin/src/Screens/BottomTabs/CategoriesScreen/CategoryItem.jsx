import React, { memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ImageComponent from "../../../Components/ImageComponent";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { onLongPress } from "../../../utils/longPressFunction";

export const CategoryItem = memo(
  ({ item, productsSelector, refreshTrigger, navigation }) => {
    return (
      <Pressable
        key={item.k}
        style={styles.categoryItem}
        onPress={() => {
          navigation.navigate("EditAddCategories", {
            category: item,
          });
        }}
        onLongPress={() => onLongPress(item, "category")}
      >
        <ImageComponent
          itemKey={item.k}
          title={item.t}
          isImage={item.i}
          type={2}
          refreshTrigger={refreshTrigger}
        />
        <View style={styles.categoryDetails}>
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>{item?.t}</Text>
            <Text style={styles.categoryCount}>
              {productsSelector?.data?.filter((e) => e.c === item.k)?.length}
            </Text>
          </View>
          {item?.s && (
            <AntDesign
              name="star"
              size={24}
              color={GlobalColors.themeColor}
              onPress={() =>
                navigation.navigate("EditAddCategories", {
                  product: {},
                })
              }
            />
          )}
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  categoryDetails: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    paddingRight: 10,
    gap: 5,
  },
  categoryText: {
    flex: 1,
    gap: 5,
  },
  categoryTitle: {
    fontWeight: "500",
  },
  categoryCount: {
    fontWeight: "700",
    fontSize: 16,
  },
});
