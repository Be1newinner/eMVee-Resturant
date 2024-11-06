import React from "react";
import { Redirect } from "expo-router";
import { Dimensions, Image, View } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Image
        style={{
          objectFit: "contain",
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          width: Dimensions.get("screen").width - 50,
          height: Dimensions.get("screen").width - 50,
        }}
        source={require("../assets/logo.png")}
      />
      <Redirect href="BottomTabs/HomeScreen" />
    </View>
  );
}
