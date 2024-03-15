import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import ProductSearchBar from "../../../Components/ProductSearchBar";
import { useEffect, useState } from "react";
import {
  PopularItems,
  AllProductsData,
} from "../../../Services/OfflineDataToLive";
import { AntDesign } from "@expo/vector-icons";
export default function ProductSearchScreen() {
  const [value, setValue] = useState("bua");
  const [filteredArray, setFilteredArray] = useState(null);

  useEffect(() => {
    if (value.length > 1) {
      const data = AllProductsData.filter((e) =>
        e.title.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredArray(data);
    }
  }, [value]);

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        height: Dimensions.get("screen").height,
        gap: 10,
      }}
    >
      <ProductSearchBar
        value={value}
        setValue={setValue}
        style={{
          marginTop: 10,
          marginHorizontal: 10,
        }}
      />
      {value.length < 2 ? (
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Our Popular Dishes
            </Text>
          }
          data={PopularItems}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 40,
            padding: 10,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                elevation: 5,
                gap: 10,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: GlobalColors.productText,
                  }}
                >
                  In {item?.category ? item?.category : "Burger"} Category
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <AntDesign
                  name="right"
                  size={24}
                  color={GlobalColors.productText}
                />
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={filteredArray}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 40,
            padding: 10,
          }}
          renderItem={({ item }) => {
            const name = item.title.toLowerCase();
            return (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 10,
                  elevation: 5,
                  gap: 10,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {name.slice(0, name.indexOf(value))}
                    <Text
                      style={{
                        color: GlobalColors.themeColor,
                      }}
                    >
                      {value}
                    </Text>
                    {name.slice(
                      name.indexOf(value) + value.length,
                      name.length
                    )}
                  </Text>
                  <Text
                    style={{
                      color: GlobalColors.productText,
                    }}
                  >
                    In {item?.category ? item?.category : "Burger"} Category
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <AntDesign
                    name="right"
                    size={24}
                    color={GlobalColors.productText}
                  />
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
