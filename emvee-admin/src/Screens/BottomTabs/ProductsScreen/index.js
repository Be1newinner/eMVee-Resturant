import { FlatList, Image, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { ProductsModal } from "../../../Components/Modals/ProductsModal";
import ImageComponent from "../../../Components/ImageComponent";

export default function ProductsScreen() {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const [editproduct, setEditproduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
      }}
    >
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
          Total Products
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {" "}
            ({productsSelector?.data?.length || 0})
          </Text>
        </Text>

        <AntDesign
          name="pluscircle"
          size={28}
          color="#fff"
          onPress={() => {
            setEditproduct(null);
            setModalVisible(true);
          }}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          gap: 20,
          padding: 10,
        }}
        initialNumToRender={6}
        ListHeaderComponent={
          <View
            style={{
              marginTop: 10,
            }}
          />
        }
        ListFooterComponent={
          <View
            style={{
              marginBottom: 80,
            }}
          />
        }
        data={productsSelector?.data?.slice().sort((a, b) => {
          if (a.t < b.t) return -1;
          if (a.t > b.t) return 1;
          return 0;
        })}
        keyExtractor={(k) => k.k}
        renderItem={({ item, index }) => {
          // console.log(item);
          return (
            <Pressable
              key={item.k}
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                elevation: 3,
                borderRadius: 10,
                overflow: "hidden",
              }}
              onPress={() => {
                setEditproduct(item);
                setModalVisible(true);
              }}
            >
              <ImageComponent
                itemKey={item.k}
                title={item.t}
                isImage={item.i}
              />
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-start",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    {item?.t}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    (
                    {
                      categorySelector?.data?.filter((e) => e.k == item?.c)[0]
                        ?.t
                    }
                    )
                  </Text>
                  <Text
                    style={{
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    ₹{item?.p}/-
                  </Text>
                </View>
                {item?.s && (
                  <AntDesign
                    name="star"
                    size={24}
                    color={GlobalColors.themeColor}
                  />
                )}
              </View>
            </Pressable>
          );
        }}
      />
      <ProductsModal
        visible={modalVisible}
        setVisible={setModalVisible}
        product={editproduct}
        setProduct={setEditproduct}
      />
    </View>
  );
}
