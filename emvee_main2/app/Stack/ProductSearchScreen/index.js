import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import ProductSearchBar from "@/components/ProductSearchBar";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import TopView from "@/components/TopView";
import { useSelector } from "react-redux";
import { getImageURL } from "@/services/offline/Image";
import { useRouter } from "expo-router";

export default function ProductSearchScreen() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const AllProductsData = useSelector((state) => state.AllProducts);
  const AllCategories = useSelector((state) => state.AllCategories);

  const PopularItems = AllProductsData.data.filter((e) => e.s === true);

  useEffect(() => {
    if (value.length > 1) {
      const data = AllProductsData.data.filter((e) =>
        e?.t?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredArray(data);
    } else {
      setFilteredArray([]);
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
      <TopView
        title="Search Dishes"
        position="relative"
        color="#222"
      />

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
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Our Popular Dishes
            </Text>
          }
          data={PopularItems}
          keyExtractor={(e) => e.k}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 100,
            padding: 10,
          }}
          renderItem={({ item }) => (
            <Pressable
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                elevation: 5,
                gap: 10,
              }}
              onPress={() =>
                router.push({ pathname: "Stack/ProductDetail", params: { productId: item.k } })
              }
            >
              {item.i ? (
                <Image
                  source={{ uri: getImageURL(item.k) }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: GlobalColors.themeColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 20, color: "#fff" }}>
                    {item.t.slice(0, 1)}
                  </Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500" }}>{item.t}</Text>
                <Text style={{ color: GlobalColors.productText }}>
                  In {item?.c ? AllCategories?.data?.find((e) => e.k === item?.c)?.t : ""} Category
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <AntDesign
                  name="right"
                  size={24}
                  color={GlobalColors.productText}
                />
              </View>
            </Pressable>
          )}
        />
      ) : (
        <FlatList
          data={filteredArray}
          keyExtractor={(e) => e.k}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 100,
            padding: 10,
          }}
          renderItem={({ item }) => (
            <Pressable
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                elevation: 5,
                gap: 10,
              }}
              onPress={() =>
                router.push({ pathname: "Stack/ProductDetail", params: { productId: item.k } })
              }
            >
              {item.i ? (
                <Image
                  source={{ uri: getImageURL(item.k) }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: GlobalColors.themeColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 20, color: "#fff" }}>
                    {item.t.slice(0, 1)}
                  </Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500" }}>{item.t}</Text>
                <Text style={{ color: GlobalColors.productText }}>
                  In {item?.c ? AllCategories?.data?.find((e) => e.k === item?.c)?.t : ""} Category
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <AntDesign
                  name="right"
                  size={24}
                  color={GlobalColors.productText}
                />
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
