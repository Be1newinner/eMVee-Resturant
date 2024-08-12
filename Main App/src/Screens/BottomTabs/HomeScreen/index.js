import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreend from "expo-splash-screen";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TopCategories from "./TopCategories";
import PopularList from "./PopularList";
import { TopViewHome } from "../../../Components/TopViewHome";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { login } from "../../../Services/Slices/AuthSlice";
import GetProductsController from "../../../Services/OrdersController/GetProductsController";
import GetAddressController from "../../../Services/OrdersController/GetAddressController";
import { addProducts } from "../../../Services/Slices/AllProductsSlice";
import { addCategories } from "../../../Services/Slices/AllCategoriesSlice";
import { addAddressArray } from "../../../Services/Slices/AddressSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
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

      await SplashScreend.hideAsync();
    })();
  }, []);

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
