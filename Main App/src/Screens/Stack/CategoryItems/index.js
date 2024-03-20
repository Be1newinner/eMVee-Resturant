import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import TopView from "../../../Components/TopView";
import AddToCart2 from "../../../Components/AddToCart2";
import { useSelector } from "react-redux";

const CategoryItems = ({ navigation, route }) => {
  const { category } = route.params;
  const AllProducts = useSelector((state) => state.AllProducts);

  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlePress = () => {
    setIsButtonActive(!isButtonActive);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e34" }}>
      <TopView
        position={"relative"}
        title={category.t}
        navigation={navigation}
      />
      <View
        style={{
          height: 120,
        }}
      >
        <View
          style={{
            top: 50,
            position: "absolute",
            left: Dimensions.get("screen").width / 4 + 20,
            elevation: 5,
            zIndex: 2,
            backgroundColor: "white",
            borderRadius: 150,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              objectFit: "contain",
            }}
            width={500}
            height={500}
            source={category.i}
          />
        </View>
      </View>
      <View style={styles.imageBox}>
        <ScrollView
          style={{
            paddingTop: 80,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text
              style={{
                padding: 20,
                fontSize: 24,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {category.t}
            </Text>
            <View
              style={{
                flex: 1,
                width: Dimensions.get("screen").width - 20,
                gap: 10,
                paddingBottom: 80,
              }}
            >
              {AllProducts?.filter((e) => e.c == category.k)?.map((item) => (
                <View
                  onPress={handlePress}
                  key={item.k}
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingVertical: 20,
                    borderBottomColor: "rgba(0,0,0,0.2)",
                    borderBottomWidth: 1,
                    gap: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        // fontWeight: 400,
                      }}
                    >
                      {item.t}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        ₹{item.p}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ₹{item.m}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "#678",
                        fontSize: 16,
                      }}
                    >
                      {item.d}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      justifyContent: "center",
                    }}
                  >
                    {item.i && (
                      <View
                        style={{
                          overflow: "hidden",
                          borderRadius: 10,
                          elevation: 5,
                        }}
                      >
                        <Image
                          style={{
                            width: 130,
                            height: 130,
                            borderWidth: 2,
                            borderColor: "rgba(0,0,0,0.1)",
                            borderRadius: 10,
                          }}
                          source={item.i}
                        />
                      </View>
                    )}

                    <AddToCart2 />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CategoryItems;

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    elevation: 5,
    height: Dimensions.get("screen").height - 150,
    overflow: "hidden",
  },
});
