import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import TopCategories from "@/components/TopCategories";
import PopularList from "@/components/PopularList";
import GetProductsController from "@/services/OrdersController/GetProductsController";
import GetAddressController from "@/services/OrdersController/GetAddressController";
import { TopViewHome } from "@/components/TopViewHome";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { login } from "@/services/Slices/AuthSlice";
import { addProducts } from "@/services/Slices/AllProductsSlice";
import { addCategories } from "@/services/Slices/AllCategoriesSlice";
import { addAddressArray } from "@/services/Slices/AddressSlice";
import { PAGES_STACK, PAGES_TAB } from "@/constants/Pages";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    (async function () {
      try {
        const data = await GetProductsController();
        dispatch(addProducts(data?.products));
        dispatch(addCategories(data?.category));
      } catch (error) {
        console.log(error);
      }

      try {
        const data = await AsyncStorage.getItem("auth");
        const data2 = await AsyncStorage.getItem("user");

        const phone_no = JSON.parse(data)?.phone_no;
        const addresses = await GetAddressController({
          phone_no,
        });
        dispatch(login(JSON.stringify({ auth: data, user: data2 })));
        dispatch(addAddressArray(addresses));
      } catch (error) {
        console.log("LOGIN ERROR!", error);
      }

      await SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TopViewHome />
      <PopularList
        children={
          <View>
            <View style={styles.categoryHeader}>
              <Text style={styles.headerText}>Our Top Categories</Text>
              <Pressable onPress={() => router.push(PAGES_TAB.CATEGORY_SCREEN)}>
                <Text style={styles.seeAllText}>See all</Text>
              </Pressable>
            </View>
            <View style={styles.topCategories}>
              <TopCategories />
            </View>
            <View style={styles.popularHeader}>
              <Text style={styles.headerText}>Our Popular Dishes</Text>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: PAGES_STACK.CATEGORY_ITEMS,
                    params: {
                      category: JSON.stringify({
                        i: true,
                        k: "1",
                        s: true,
                        t: "eMvee's Special",
                      }),
                    },
                  })
                }
              >
                <Text style={styles.seeAllText}>See all</Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.primary,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    marginVertical: 15,
    fontSize: 17,
    fontWeight: "500",
  },
  seeAllText: {
    marginVertical: 15,
    fontSize: 15,
    fontWeight: "400",
  },
  topCategories: {
    paddingHorizontal: 10,
  },
  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
