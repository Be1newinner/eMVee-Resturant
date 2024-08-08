import { Dimensions, Text, View } from "react-native";
import { GlobalColors } from "../Infrastructure/GlobalVariables";

export default function Header2({ title, rightIcon }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: GlobalColors.themeColor,
        padding: 20,
        elevation: 10,
        alignItems: "center",
        width: Dimensions.get("screen").width - 20,
        position: "absolute",
        top: 10,
        zIndex: 10,
        left: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#000",
        }}
      >
        {title}
      </Text>

      {rightIcon}
    </View>
  );
}
