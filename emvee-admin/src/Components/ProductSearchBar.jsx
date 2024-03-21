import { Input } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

export default function ProductSearchBar({ value, setValue, style }) {
  return (
    <Input
      placeholder="Search for dishes"
      value={value}
      style={{
        borderRadius: 15,
        marginTop: 5,
        elevation: 5,
        ...style,
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
