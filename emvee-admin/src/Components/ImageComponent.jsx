import { Image, Text, View } from "react-native";
import { GlobalColors } from "../Infrastructure/GlobalVariables";
import { useEffect, useState } from "react";

export default function ImageComponent({
  itemKey,
  title,
  type = 1,
  isImage,
  refreshTrigger,
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Construct the URL and update the state
    const newUrl = `https://firebasestorage.googleapis.com/v0/b/emvee-resturant.appspot.com/o/${
      type == 1 ? "pa" : "ca"
    }%2F${itemKey}.png?alt=media&t=${new Date().getTime()}`;

    setUrl(newUrl);
  }, [itemKey, type, refreshTrigger]);

  return (
    <View>
      {isImage ? (
        <Image
          source={{
            uri: url,
          }}
          style={{
            width: 80,
            height: 80,
          }}
        />
      ) : (
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
      )}
    </View>
  );
}
