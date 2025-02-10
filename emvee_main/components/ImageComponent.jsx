import { useState } from "react";
import { Image, Text, View } from "react-native";
import { GlobalColors } from "@/Infrastructure/GlobalVariables";

export default function ImageComponent({ itemKey, title, type = 1 }) {
  const [Error, setError] = useState(true);
  return (
    <View>
      <Image
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/emvee-resturant.appspot.com/o/${
            type == 1 ? "ca" : "pa"
          }%2F${itemKey}.png?alt=media`,
        }}
        style={{
          width: Error ? 80 : 0,
          height: Error ? 80 : 0,
        }}
        onError={(error) => setError(false)}
      />
      {!Error ? (
        <View
          style={{
            backgroundColor: GlobalColors.themeColor,
            minHeight: 80,
            minWidth: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {title?.slice(0, 1)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
