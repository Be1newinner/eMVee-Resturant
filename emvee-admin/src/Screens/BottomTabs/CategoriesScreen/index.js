import { FlatList, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { CategoryModal } from "../../../Components/Modals/CategoryModal";

export default function CategoriesScreen() {
  const [TotalCategories, setTotalCategories] = useState(0);
  const categorySelector = useSelector((selector) => selector.AllCategories);

  const [modalVisible, setModalVisible] = useState(true);

  // useEffect(() => {
  //   console.log(categorySelector);
  // }, []);

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
            ({TotalCategories})
          </Text>
        </Text>

        <AntDesign
          name="pluscircle"
          size={28}
          color="#fff"
          onPress={() => setModalVisible(true)}
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
            <View
              key={item.k}
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
                ({5})
              </Text>
            </View>
          );
        }}
      />
      <CategoryModal visible={modalVisible} setVisible={setModalVisible} />
    </View>
  );
}
