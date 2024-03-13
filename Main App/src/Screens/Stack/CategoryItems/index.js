import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import TopView from "../../../Components/TopView";

const CategoryItems = ({ navigation, route }) => {
  const item = {
    id: 1,
    title: "The Burgers",
    image: require("../../../../assets/images/category/drinks.webp"),
  };

  const items = [
    {
      title: "Cheese Burger Chicken",
      key: 0,
      image: require("../../../../assets/images/category/drinks.webp"),
      mrp: 770,
      price: 550,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Ham Burger Chicken",
      key: 1,
      image: require("../../../../assets/images/category/drinks.webp"),
      mrp: 770,
      price: 550,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlePress = () => {
    setIsButtonActive(!isButtonActive);
  };
  const [quantity, setQuantity] = useState(1);

  if (!quantity < 0) {
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#e34" }}>
      <TopView
        position={"relative"}
        title={item.title}
        navigation={navigation}
      />
      <View
        style={{
          height: 120,
        }}
      />
      <View style={styles.imageBox}>
        <View
          style={{
            elevation: 5,
            width: 160,
            height: 160,
            marginTop: -80,
            borderRadius: 100,
          }}
        >
          <Image
            style={{
              width: 160,
              height: 160,
              borderRadius: 100,
            }}
            width={160}
            height={160}
            source={item.image}
          />
        </View>

        <ScrollView>
          <View>
            <Text
              style={{
                padding: 20,
                fontSize: 24,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
            <View
              style={{
                flex: 1,
                width: Dimensions.get("screen").width - 20,
                gap: 10,
                paddingBottom: 80,
              }}
            >
              {items?.map((item) => (
                <View
                  onPress={handlePress}
                  key={item.key}
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
                      {item.title}
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
                        ₹{item.price}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ₹{item.mrp}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "#678",
                        fontSize: 16,
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                    }}
                  >
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
                        source={item.image}
                      />
                    </View>

                    <Pressable
                      style={{
                        borderColor: "#e34",
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: -28,
                        paddingVertical: 5,
                        backgroundColor: "rgb(240,220,220)",
                      }}
                    >
                      <Text
                        style={{
                          color: "#e34",
                          fontWeight: 700,
                          fontSize: 18,
                          marginBottom: 2,
                        }}
                      >
                        ADD +
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                end of products
              </Text>
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
  },
});
