import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TopView({
  title = "",
  position = "absolute",
  color = "rgb(255, 255, 255)",
  style,
}) {
  const router = useRouter();

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
      {router.canGoBack() && (
        <Pressable
          onPress={() => router.back()}
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
