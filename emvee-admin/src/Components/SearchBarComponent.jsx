import { Input } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Dimensions } from "react-native";

export default function SearchBarComponent({
  value,
  setValue,
  style,
  placeholder = "Search of dishes",
}) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      style={{
        borderRadius: 5,
        marginTop: 20,
        elevation: 5,
        width: Dimensions.get("screen").width - 20,
        left: 10,
        zIndex: 9,
        ...style,
        backgroundColor: "#fff",
      }}
      size="large"
      accessoryRight={
        <AntDesign
          name={value ? "close" : "search1"}
          size={24}
          color="rgba(0,0,0,0.5)"
          onPress={() => setValue("")}
        />
      }
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
}
