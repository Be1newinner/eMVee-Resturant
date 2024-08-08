import { ActivityIndicator, Image, Text, View } from "react-native";
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
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const onLoadEnd = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setImageError(true);
  };

  useEffect(() => {
    const newUrl = `https://firebasestorage.googleapis.com/v0/b/emvee-resturant.appspot.com/o/${
      type === 1 ? "pa" : "ca"
    }%2F${itemKey}.png?alt=media&t=${new Date().getTime()}`;

    setUrl(newUrl);
    setLoading(true);
    setImageError(false);
  }, [itemKey, type, refreshTrigger]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ position: "absolute" }}
        />
      )}
      {isImage && url ? (
        <Image
          source={{ uri: url }}
          style={{ width: 80, height: 80 }}
          onLoadEnd={onLoadEnd}
          onError={onError}
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
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {title?.slice(0, 1)}
          </Text>
        </View>
      )}
      {imageError && !loading && (
        <View
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: GlobalColors.themeColor,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            {title?.slice(0, 1)}
          </Text>
        </View>
      )}
    </View>
  );
}
