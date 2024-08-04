import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TopView({
  navigation = null,
  title = "",
  position = "absolute",
  color = "#fff",
  style,
}) {
  return (
    <View
      style={{
        position,
        top: 10,
        left: 10,
        zIndex: 99,
        backgroundColor: "rgba(0,0,0,0)",
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        ...style,
      }}
    >
      {navigation?.canGoBack() && (
        <Pressable
          onPress={() => navigation?.goBack()}
          style={{
            elevation: 5,
            marginRight: 10,
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={36}
            color={color}
            style={{
              elevation: 5,
            }}
          />
        </Pressable>
      )}
      <Text
        style={{
          color,
          fontWeight: 500,
          fontSize: 18,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
