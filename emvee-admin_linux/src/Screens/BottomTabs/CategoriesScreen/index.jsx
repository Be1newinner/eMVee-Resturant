import React, { useState, useMemo, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import ImageComponent from "../../../Components/ImageComponent";

const CategoriesScreen = ({ navigation }) => {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const sortedCategories = useMemo(() => {
    return categorySelector?.data?.slice().sort((a, b) => {
      if (a.t < b.t) return -1;
      if (a.t > b.t) return 1;
      return 0;
    });
  }, [categorySelector?.data, categorySelector?.updateTime]);

  useEffect(() => {
    const time = Date.now();
    console.log({ time });
    setRefreshTrigger(time);
  }, [categorySelector?.data, categorySelector?.updateTime]);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        key={item.k}
        style={styles.categoryItem}
        onPress={() => {
          navigation.navigate("EditAddCategories", {
            category: item,
          });
        }}
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
              {productsSelector?.data?.filter((e) => e.c == item.k)?.length}
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Total Categories
          <Text style={styles.headerCount}>
            ({categorySelector?.data?.length || 0})
          </Text>
        </Text>
        <AntDesign
          name="pluscircle"
          size={28}
          color="#fff"
          onPress={() => {
            navigation.navigate("EditAddCategories", { category: {} });
          }}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        initialNumToRender={6}
        ListHeaderComponent={<View style={styles.listHeader} />}
        ListFooterComponent={<View style={styles.listFooter} />}
        data={sortedCategories}
        keyExtractor={(item) => item.k}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primary,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalColors.themeColor,
    padding: 20,
    elevation: 5,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  headerCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  listContent: {
    gap: 20,
    padding: 10,
  },
  listHeader: {
    marginTop: 10,
  },
  listFooter: {
    marginBottom: 80,
  },
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

export default React.memo(CategoriesScreen);
