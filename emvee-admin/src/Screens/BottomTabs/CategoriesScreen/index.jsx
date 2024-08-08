import React, { useState, useMemo, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { CategoryItem } from "./CategoryItem";
import Header from "../../../Components/Header";

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

  return (
    <View style={styles.container}>
      <Header
        title={"Total Categories"}
        SelectorData={categorySelector?.data}
        navigation={navigation}
        nextScteen={"EditAddCategories"}
      />

      <FlatList
        contentContainerStyle={styles.listContent}
        initialNumToRender={6}
        ListHeaderComponent={<View style={styles.listHeader} />}
        ListFooterComponent={<View style={styles.listFooter} />}
        data={sortedCategories}
        keyExtractor={(item) => item.k}
        renderItem={(e) => (
          <CategoryItem
            item={e.item}
            productsSelector={productsSelector}
            refreshTrigger={refreshTrigger}
            navigation={navigation}
          />
        )}
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
});

export default React.memo(CategoriesScreen);
