import { Dimensions, FlatList, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { Button, Divider } from "@ui-kitten/components";
import AddNewAddressButton from "../../../Components/AddNewAddressButton";

export default function AddAddressScreen({ navigation }) {
  const saved_addresses = [
    {
      h: "h449. g13",
      l: "asthan lsndir",
      n: "Vijay",
      p: "8130506844",
      pi: "110062",
      t: 0,
      k: 0,
    },
    {
      h: "h449. g13",
      l: "asthan lsndir",
      n: "Vijay",
      p: "8130506844",
      pi: "110062",
      t: 1,
      k: 1,
    },
    {
      h: "h449. g13",
      l: "asthan lsndir",
      n: "Vijay",
      p: "8130506844",
      pi: "110062",
      t: 2,
      k: 2,
    },
  ];
  const CurrentAddress = saved_addresses[0];
  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: GlobalColors.primary,
        height: Dimensions.get("screen").height,
        padding: 10,
        gap: 10,
      }}
      ListHeaderComponent={
        <View>
          <TopView
            navigation={navigation}
            title={
              <View>
                <Text
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {CurrentAddress.t == 0
                    ? "Home"
                    : CurrentAddress.t == 1
                    ? "Work"
                    : "Other"}
                </Text>
                <Text>{CurrentAddress.h}</Text>
              </View>
            }
            position="relative"
            style={{
              marginBottom: 20,
            }}
            color="black"
          />
          <Text>Your Saved Address</Text>
        </View>
      }
      data={saved_addresses}
      ListFooterComponent={
        <View
          style={{
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Divider style={{ flex: 1, backgroundColor: "grey" }} />
            <Text>or</Text>
            <Divider style={{ flex: 1, backgroundColor: "grey" }} />
          </View>
          <AddNewAddressButton />
        </View>
      }
      keyExtractor={(e) => e.k}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Feather name="map-pin" size={24} color="black" />
          <View>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              {item.t == 0 ? "Home" : item.t == 1 ? "Work" : "Other"}
            </Text>
            <Text>
              {item.n} {item.p}
            </Text>
            <Text>
              {item.h} {item.l} {item.pi}
            </Text>
          </View>
        </View>
      )}
    />
  );
}
