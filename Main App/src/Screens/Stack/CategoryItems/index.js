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
import AddToCart2 from "../../../Components/AddToCart2";

const CategoryItems = ({ navigation, route }) => {
  const { category } = route.params;

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
        title={category.title}
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
            marginTop: -100,
            position: "absolute",
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              objectFit: "contain",
            }}
            width={500}
            height={500}
            source={category.image}
          />
        </View>

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
              {category.title}
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
  },
});
