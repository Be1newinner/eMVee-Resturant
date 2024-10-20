import { Text, View } from "react-native";
import { GlobalColors } from "../infrasrtructure/GlobalVariables";

export default function ProfileTopView({ name = "User", phone = "" }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        gap: 15,
        padding: 30,
        margin: 10,
        borderRadius: 20,
        alignItems: "center",
        elevation: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(240,48,64,0.4)",
          width: 80,
          height: 80,
          borderRadius: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: GlobalColors.themeColor,
          }}
        >
          {name.slice(0, 1).toUpperCase() || "U"}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 24,
          }}
        >
          {name || "User"}
        </Text>
        <Text>{phone || "Please Login"}</Text>
      </View>
    </View>
  );
}
