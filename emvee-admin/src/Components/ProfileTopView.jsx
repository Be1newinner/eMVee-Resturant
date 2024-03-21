import { Text, View } from "react-native";
import { GlobalColors } from "../Infrastructure/GlobalVariables";

export default function ProfileTopView() {
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
            color:  GlobalColors.themeColor,
          }}
        >
          V
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 24,
          }}
        >
          Vijay
        </Text>
        <Text>be1newinner@gmail.com</Text>
      </View>
    </View>
  );
}
