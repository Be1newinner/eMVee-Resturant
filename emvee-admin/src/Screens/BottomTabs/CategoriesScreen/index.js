import { Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useState } from "react";

export default function CategoriesScreen() {
  const [TotalCategories, setTotalCategories] = useState(0);
  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
          marginLeft: 10,
          marginRight: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Total Categories
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {TotalCategories}
        </Text>
      </View>

      <View
        style={{
          gap: 10,
        }}
      >
        {[2, 5, 9, 3, 1, 8].map((item, index) => (
          <View
            key={item}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              flexDirection: "row",
              gap: 10,
              elevation: 3,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              {index}.
            </Text>
            <Text
              style={{
                fontWeight: 500,
                flex: 1,
              }}
            >
              Burgers
            </Text>
            <Text
              style={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              ({item})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
