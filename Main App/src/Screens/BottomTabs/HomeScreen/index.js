import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import TopCategories from "./TopCategories";
import PopularList from "./PopularList";

import { TopViewHome } from "../../../Components/TopViewHome";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PopularList
        navigation={navigation}
        children={
          <View>
            <TopViewHome />
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
                Our Products
              </Text>
              <Pressable onPress={() => navigation.navigate("Pizza")}>
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
                Popular
              </Text>
              <Pressable onPress={() => navigation.navigate("PizzaScreen")}>
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
    backgroundColor: "#f0f0f0",
  },
});
