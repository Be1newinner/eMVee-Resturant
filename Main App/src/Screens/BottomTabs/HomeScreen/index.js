import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import TopCategories from "./TopCategories";
import PopularList from "./PopularList";

import { TopViewHome } from "../../../Components/TopViewHome";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useSelector } from "react-redux";
import * as SplashScreend from "expo-splash-screen";

const HomeScreen = ({ navigation }) => {
  const PopularItems = useSelector((state) => state.AllProducts);

  useEffect(() => {
    (async function () {
      if (PopularItems.length > 0) {
        // console.log(PopularItems);
        await SplashScreend.hideAsync();
      }
    })();
  }, [PopularItems]);

  return (
    <View style={styles.container}>
      <PopularList
        navigation={navigation}
        children={
          <View>
            <TopViewHome navigation={navigation} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{ marginVertical: 15, fontSize: 17, fontWeight: "500" }}
              >
                Our Top Categories
              </Text>
              <Pressable onPress={() => navigation.navigate("Category")}>
                <Text
                  style={{
                    marginVertical: 15,
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  See all
                </Text>
              </Pressable>
            </View>
            {/*Productlist  */}
            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              <TopCategories />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              {/* ProductDetail */}
              <Text
                style={{ marginVertical: 15, fontSize: 18, fontWeight: "500" }}
              >
                Our Popular Dishes
              </Text>
              <Pressable onPress={() => navigation.navigate("Category")}>
                <Text
                  style={{
                    marginVertical: 15,
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  See all
                </Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.primary,
  },
});
