import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { Button, Card, Modal } from "@ui-kitten/components";
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
import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../../../Infrastructure/firebase.config";

export default function AddAddressScreen({ navigation }) {
  const saved_addresses = useSelector((state) => state.Address);
  const dispatch = useDispatch();
  
  const [ConfirmVisible, setConfirmVisible] = useState(false);
  const [ItemKey, setItemKey] = useState(null);

  const [SavedAddresses, setSavedAddress] = useState(null);
  const [DefaultAddresses, setDefaultAddress] = useState(0);
  const [CurrentAddresses, setCurrentAddresses] = useState(null);

  useEffect(() => {
    setSavedAddress(saved_addresses?.addresses || null);
    setDefaultAddress(saved_addresses?.default || 0);
    console.log("addresses => ", saved_addresses?.addresses);
  }, [saved_addresses]);

  useEffect(() => {
    if (SavedAddresses)
      setCurrentAddresses(
        SavedAddresses.filter((e) => e.k === DefaultAddresses)[0]
      );
  }, [SavedAddresses, DefaultAddresses]);

  const deleteThisAddress = async () => {
    // await deleteDoc(doc(firestoreDB, "ur57", ));
    // dispatch(removeAddress(ItemKey));
    // setConfirmVisible(false);
    console.log("ItemKey => ", ItemKey);
  };

  return (
    <>
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
              onPress={() => {
                setItemKey(item.k);
                setConfirmVisible(true);
              }}
            />
          </Pressable>
        )}
      />

      <Modal
        visible={false}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onBackdropPress={() => {
          setItemKey(null);
          setConfirmVisible(false);
        }}
      >
        <Card
          disabled={true}
          style={{
            gap: 10,
          }}
        >
          <View
            style={{
              maxWidth: "auto",
              gap: 20,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Delete this address?
              </Text>
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Are you sure, delete this address?
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Button
                status="danger"
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  setItemKey(null);
                  setConfirmVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                status="danger"
                appearance="outline"
                onPress={() => deleteThisAddress()}
              >
                Confirm
              </Button>
            </View>
          </View>
        </Card>
      </Modal>
    </>
  );
}
