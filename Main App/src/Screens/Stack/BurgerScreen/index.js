import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const BurgerScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlePress = () => {
    // Toggle the active state when the button is pressed
    setIsButtonActive(!isButtonActive);
  };
  const [quantity, setQuantity] = useState(1);

  if(!quantity < 0) {
      
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#e5002b" }}>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Ionicons name="chevron-back-circle" size={38} color="white" />
        </Pressable>
      </SafeAreaView>

      <View style={styles.imageBox}>
        <Image style={styles.image} source={item.image} />

        <View>
          <Text
            style={{
              padding: 20,
              fontSize: 30,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {item.title}
          </Text>
          <View style={{ flex: 1, width: 500, paddingHorizontal: 70 }}>
            <Pressable
              onPress={handlePress}
              style={{
                backgroundColor: isButtonActive ? "green" : "white",
                marginVertical: 6,
                justifyContent: "space-between",
                flexDirection: "row",
                borderColor: "black",
                borderWidth: 1,
                padding: 12,
                borderRadius: 7,
              }}
            >
              <Text>Cheese Burger Chicken</Text>
              <Text>₹100</Text>
            </Pressable>
            <Pressable
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderColor: "black",
                borderWidth: 1,
                padding: 12,
                borderRadius: 7,
              }}
            >
              <Text>Ham Burger Chicken</Text>
              <Text>₹80</Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",

                alignItems: "center",
                marginTop: "70%",
              }}
            >
              <View>
                <Text>Quantity</Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 0}
                  style={{
                    backgroundColor: "lightgray",
                    width: 30,
                    height: 30,
                    padding: 2,
                    alignItems: "center",
                    borderRadius: 50,
                    justifyContent: "center",
                  }}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={{
                    backgroundColor: "lightgray",
                    width: 30,
                    height: 30,
                    padding: 2,
                    alignItems: "center",
                    borderRadius: 50,
                    justifyContent: "center",
                  }}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#e5002b",
                  paddingVertical: 13,
                  alignItems: "center",
                  borderRadius: 12,
                  marginTop: 15,
                }}
              >
                <Text style={{color: 'white',}}>Place order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BurgerScreen;

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 150,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 160,
    alignItems: "center",
    marginTop: -100,
    justifyContent: "center",
  },
});
