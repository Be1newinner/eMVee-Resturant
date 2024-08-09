import { Text, View } from "react-native";
import { GlobalColors } from "../Infrastructure/GlobalVariables";
import { AntDesign } from "@expo/vector-icons";

export default function Header({
  SelectorData,
  navigation,
  title,
  nextScteen,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: GlobalColors.themeColor,
        padding: 20,
        elevation: 5,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {title}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          ({SelectorData?.length || 0})
        </Text>
      </Text>

      <AntDesign
        name="pluscircle"
        size={28}
        color="#fff"
        onPress={() =>
          navigation.navigate(nextScteen, {
            product: {},
          })
        }
      />
    </View>
  );
}
