import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { GlobalColors } from "../Infrastructure/GlobalVariables";

export const TopViewHome = ({ navigation }) => {
  const [value, setValue] = React.useState("");

  return (
    <View
      style={{
        backgroundColor:  GlobalColors.themeColor,
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        gap: 5,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "#fff",
        }}
      >
        Hi, Jason
      </Text>
      <View style={styles.header}>
        <View style={styles.location}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: -3,
            }}
          >
            <MaterialIcons name="place" size={17} color="#fff" />
            <Text
              style={{
                color: "#fff",
              }}
            >
              New Lamka, Vengnuam
            </Text>
          </Pressable>
        </View>
      </View>

      <Input
        placeholder="Search for dishes"
        value={value}
        style={{
          borderRadius: 15,
          marginTop: 5,
        }}
        size="large"
        accessoryRight={
          <AntDesign name="search1" size={24} color="rgba(0,0,0,0.5)" />
        }
        onChangeText={(nextValue) => setValue(nextValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
  },
  input: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 7,
    borderRadius: 9,
    marginTop: 5,
  },
});
