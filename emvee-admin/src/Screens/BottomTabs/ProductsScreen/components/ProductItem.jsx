import React, { useCallback } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ImageComponent from "../../../../Components/ImageComponent";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../../../Infrastructure/GlobalVariables";

export const ProductItem = React.memo(
  ({
    item,
    deleteProduct = () => null,
    categorySelector = {},
    navigation,
    smallView = false,
  }) => {
    const onPress = useCallback(() => {
      navigation.navigate("EditAddProducts", {
        product: item,
      });
    }, [item]);

    const onLongPress = useCallback(() => {
      Alert.alert(
        "Delete",
        `Are you sure you want to delete item number ${item.k} ${
          item.t || ""
        }?`,
        [
          { text: "Cancel" },
          {
            text: "Delete",
            onPress: () => deleteProduct({ itemKey: item.k }),
          },
        ]
      );
    }, [item, deleteProduct]);

    const CategorySelected = categorySelector?.data?.filter(
      (e) => e.k == item?.c
    )[0]?.t;

    return (
      <Pressable
        key={item.k}
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          elevation: 3,
          borderRadius: 10,
          overflow: "hidden",
        }}
        onPress={onPress}
        onLongPress={() => !smallView && onLongPress()}
      >
        <ImageComponent itemKey={item.k} title={item.t} isImage={item.i} />
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-start",
            padding: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "500", flex: 1 }}>{item?.t}</Text>
            {CategorySelected && (
              <Text style={{ fontWeight: "500", flex: 1 }}>
                ({CategorySelected})
              </Text>
            )}
            <Text style={{ fontWeight: "500", flex: 1 }}>₹{item?.p}/-</Text>
          </View>
          {item?.s && (
            <AntDesign name="star" size={24} color={GlobalColors.themeColor} />
          )}
        </View>
      </Pressable>
    );
  }
);
