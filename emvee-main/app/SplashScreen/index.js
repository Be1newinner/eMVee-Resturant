import { View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as SplashScreend from "expo-splash-screen";

const SplashScreen = () => {
  const PopularItems = useSelector((state) => state.AllProducts);

  useEffect(() => {
    (async function () {
      if (PopularItems.length > 0) {
        console.log(PopularItems);
        await SplashScreend.hideAsync();
      }
    })();
  }, [PopularItems]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("screen").height - 20,
      }}
    >
      <Image
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").width,
          objectFit: "contain",
        }}
        source={require("/assets/logo.png")}
      />
    </View>
  );
};
export default SplashScreen;
