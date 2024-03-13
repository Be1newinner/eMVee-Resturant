import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { TotalCategoryList } from "../../../Services/OfflineDataToLive";
import { Input } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { TopViewHome } from "../../../Components/TopViewHome";

const CategoryScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");

  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,100,0.04)",
      }}
    >
      <FlatList
        data={TotalCategoryList}
        numColumns={2}
        contentContainerStyle={{
          rowGap: 10,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <View>
            <TopViewHome />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              Order from our curated categories
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigation.navigate("CategoryItems")}
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginLeft: 10,
              marginRight: index % 2 ? 10 : 0,
            }}
          >
            <View
              style={{
                color: "black",
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textAlign: "center",
                  marginRight: 13,
                }}
              >
                {item.title}
              </Text>
            </View>
            <View
              style={{
                // elevation: 5,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Image
                style={{
                  width: Dimensions.get("screen").width / 2 - 17,
                  height: Dimensions.get("screen").width / 2 - 17,
                  borderRadius: 10,
                }}
                source={item.image}
              />
            </View>
            {/* <Text
                style={{
                  // color: "#fff",
                  // fontSize: 18,
                }}
              >
                {item.title}
              </Text> */}
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryScreen;
