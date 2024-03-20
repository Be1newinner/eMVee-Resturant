import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { Divider } from "@ui-kitten/components";
import AddNewAddressButton from "../../../Components/AddNewAddressButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changeDefaultAddress,
  removeAddress,
} from "../../../Services/Slices/AddressSlice";
import { AntDesign } from "@expo/vector-icons";

export default function AddAddressScreen({ navigation }) {
  const saved_addresses = useSelector((state) => state.Address);
  const dispatch = useDispatch();

  const [SavedAddresses, setSavedAddress] = useState(null);
  const [DefaultAddresses, setDefaultAddress] = useState(0);
  const [CurrentAddresses, setCurrentAddresses] = useState(null);

  useEffect(() => {
    setSavedAddress(saved_addresses?.addresses || null);
    setDefaultAddress(saved_addresses?.default || 0);
  }, [saved_addresses]);

  useEffect(() => {
    if (SavedAddresses)
      setCurrentAddresses(
        SavedAddresses.filter((e) => e.k === DefaultAddresses)[0]
      );
  }, [SavedAddresses, DefaultAddresses]);

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
              CurrentAddresses ? (
                <View>
                  <Text
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {CurrentAddresses?.t == 0
                      ? "Home"
                      : CurrentAddresses?.t == 1
                      ? "Work"
                      : "Other"}
                  </Text>
                  <Text>
                    {CurrentAddresses?.h.toUpperCase() +
                      ", " +
                      CurrentAddresses?.l.toUpperCase()}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Please add an address
                </Text>
              )
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
      data={SavedAddresses}
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
        <Pressable
          style={{
            flexDirection: "row",
            gap: 5,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            elevation: 5,
            borderWidth: 2,
            borderColor:
              DefaultAddresses === item.k
                ? GlobalColors.themeColor
                : "transparent",
          }}
          onPress={() => {
            dispatch(changeDefaultAddress(item.k));
          }}
        >
          <Feather name="map-pin" size={24} color="black" />
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
              {item.t == 0 ? "Home" : item.t == 1 ? "Work" : "Other"}
            </Text>
            <Text>
              {item.n} {item.p}
            </Text>
            <Text>
              {item.h.toUpperCase() +
                ", " +
                item.l.toUpperCase() +
                ", " +
                item.pi}
            </Text>
          </View>
          <AntDesign
            name="closecircleo"
            size={24}
            color={GlobalColors.themeColor}
            onPress={() => dispatch(removeAddress(item.k))}
          />
        </Pressable>
      )}
    />
  );
}
