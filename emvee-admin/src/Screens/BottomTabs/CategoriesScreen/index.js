import { FlatList, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { CategoryModal } from "../../../Components/Modals/CategoryModal";

export default function CategoriesScreen() {
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const [editCategory, setEditCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   console.log("productsSelector => ", productsSelector);
  // }, [productsSelector]);

  // useEffect(() => {
  //   if (editCategory) setModalVisible(true);
  //   else setModalVisible(false);
  // }, [editCategory]);

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
            {" "}
            ({categorySelector?.length || 0})
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
          gap: 10,
          padding: 10,
        }}
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
        data={categorySelector}
        keyExtractor={(k) => k.k}
        renderItem={({ item, index }) => {
          // console.log(item);
          return (
            <Pressable
              key={item.k}
              style={{
                backgroundColor: "#fff",
                padding: 20,
                flexDirection: "row",
                gap: 10,
                elevation: 3,
                borderRadius: 10,
              }}
              onPress={() => {
                setEditCategory(item);
                setModalVisible(true);
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                }}
              >
                {index + 1}.
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {item?.t}
              </Text>
              {item?.s && (
                <AntDesign
                  name="star"
                  size={24}
                  color={GlobalColors.themeColor}
                />
              )}
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                ({productsSelector?.filter((e) => e.c == item.k)?.length})
              </Text>
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
