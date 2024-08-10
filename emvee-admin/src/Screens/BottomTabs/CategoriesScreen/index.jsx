import React, { useState, useMemo, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { CategoryItem } from "./CategoryItem";
import SearchBarComponent from "../../../Components/SearchBarComponent";
import Header2 from "../../../Components/Header2";

const CategoriesScreen = ({ navigation }) => {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [SearchInput, setSearchInput] = useState("");

  const sortedCategories = useMemo(() => {
    if (SearchInput?.length > 1) {
      const data = categorySelector?.data?.filter((e) =>
        e?.t?.toLowerCase().includes(SearchInput?.toLowerCase())
      );

      return data?.slice().sort((a, b) => {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        return 0;
      });
    } else
      return categorySelector?.data?.slice().sort((a, b) => {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        return 0;
      });
  }, [categorySelector?.data, categorySelector?.updateTime, SearchInput]);

  useEffect(() => {
    const time = Date.now();
    console.log({ time });
    setRefreshTrigger(time);
  }, [categorySelector?.data, categorySelector?.updateTime]);

  return (
    <View style={styles.container}>
      <Header2
        title={`Total Categories ${categorySelector?.data?.length}`}
        rightIcon={
          <AntDesign
            name="pluscircle"
            size={28}
            onPress={() =>
              navigation.navigate("EditAddCategories", {
                product: {},
              })
            }
          />
        }
      />

      <SearchBarComponent
        value={SearchInput}
        setValue={setSearchInput}
        style={{
          marginBottom: -20,
          marginTop: 90,
        }}
        placeholder="Search for Categories"
      />

      <FlatList
        contentContainerStyle={styles.listContent}
        initialNumToRender={6}
        maxToRenderPerBatch={5}
        windowSize={10}
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
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
