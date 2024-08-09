import React from "react";
import { Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import ImageComponent from "../../../../Components/ImageComponent";
import { GlobalColors } from "../../../../Infrastructure/GlobalVariables";
import { onLongPress } from "../../../../utils/longPressFunction";

export const ProductItem = React.memo(
  ({ item, categorySelector = {}, navigation }) => {
    //
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
        onPress={() =>
          navigation.navigate("EditAddProducts", {
            product: item,
          })
        }
        onLongPress={() => onLongPress(item)}
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
