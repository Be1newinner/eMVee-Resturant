import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import ImageComponent from "../../../Components/ImageComponent";
import { firestoreDB } from "../../../Infrastructure/firebase.config";

export default function ProductsScreen({ navigation }) {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);

  const ListItem = React.memo(({ item, deleteProduct, categorySelector }) => {
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
        onLongPress={onLongPress}
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
            <Text style={{ fontWeight: "500", flex: 1 }}>
              ({categorySelector?.data?.filter((e) => e.k == item?.c)[0]?.t})
            </Text>
            <Text style={{ fontWeight: "500", flex: 1 }}>₹{item?.p}/-</Text>
          </View>
          {item?.s && (
            <AntDesign name="star" size={24} color={GlobalColors.themeColor} />
          )}
        </View>
      </Pressable>
    );
  });

  async function deleteProduct({ itemKey = null }) {
    try {
      if (itemKey != null) {
        console.log("DELETING ITEM : ", itemKey);
        await deleteDoc(doc(firestoreDB, "pr47", itemKey));
      } else {
        throw "Item Key not Found!";
      }
    } catch (error) {
      console.warn("Product Deleting Error => ", error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: GlobalColors.themeColor,
          padding: 20,
          elevation: 5,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Total Products
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            ({productsSelector?.data?.length || 0})
          </Text>
        </Text>

        <AntDesign
          name="pluscircle"
          size={28}
          color="#fff"
          onPress={() =>
            navigation.navigate("EditAddProducts", {
              product: {},
            })
          }
        />
      </View>

      <FlatList
        contentContainerStyle={{
          gap: 20,
          padding: 10,
        }}
        initialNumToRender={6}
        ListHeaderComponent={<View style={{ marginTop: 10 }} />}
        ListFooterComponent={<View style={{ marginBottom: 80 }} />}
        data={productsSelector?.data
          ?.slice()
          .sort((a, b) => (a.t < b.t ? -1 : a.t > b.t ? 1 : 0))}
        keyExtractor={(k) => k.k}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteProduct={deleteProduct}
            categorySelector={categorySelector}
          />
        )}
      />
    </View>
  );
}
