import { FlatList, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { CategoryModal } from "../../../Components/Modals/CategoryModal";
import ImageComponent from "../../../Components/ImageComponent";

export default function CategoriesScreen() {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const [editCategory, setEditCategory] = useState(null);
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
          Total Categories
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            ({categorySelector?.data?.length || 0})
          </Text>
        </Text>

        <AntDesign
          name="pluscircle"
          size={28}
          color="#fff"
          onPress={() => {
            setEditCategory(null);
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
        data={categorySelector?.data?.slice().sort((a, b) => {
          if (a.t < b.t) return -1;
          if (a.t > b.t) return 1;
          return 0;
        })}
        keyExtractor={(k) => k.k}
        renderItem={({ item }) => {
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
                setEditCategory(item);
                setModalVisible(true);
              }}
            >
              <ImageComponent itemKey={item.k} title={item.t} />
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  padding: 5,
                  paddingRight: 10,
                  gap: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {item?.t}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {
                      productsSelector?.data?.filter((e) => e.c == item.k)
                        ?.length
                    }
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
      <CategoryModal
        visible={modalVisible}
        setVisible={setModalVisible}
        category={editCategory}
        setCategory={setEditCategory}
      />
    </View>
  );
}
