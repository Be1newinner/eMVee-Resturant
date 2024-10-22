import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { Button, Card, Modal } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import TopView from "@/components/TopView";
import { Divider } from "@ui-kitten/components";
import AddNewAddressButton from "@/components/AddNewAddressButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changeDefaultAddress,
  removeAddress,
} from "@/services/Slices/AddressSlice";
import { AntDesign } from "@expo/vector-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "@/infrasrtructure/firebase.config";
import { useRouter } from "expo-router";

export default function AddAddressScreen() {
  const saved_addresses = useSelector((state) => state.Address);
  const AuthSelector = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();
  const router = useRouter();

  const [ConfirmVisible, setConfirmVisible] = useState(false);
  const [ItemKey, setItemKey] = useState(null);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    (async function () {
      const auth = AuthSelector.auth;
      if (auth?.phone_no?.length == 10) {
        setIsLoggedIn(true);
      }
    })();
  }, [AuthSelector]);

  const deleteThisAddress = async () => {
    try {
      await deleteDoc(doc(firestoreDB, "ur57", ItemKey));
      dispatch(removeAddress(ItemKey));
      setConfirmVisible(false);
    } catch (error) {
      console.log(error);
    }
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
            {IsLoggedIn ? <Text>Your Saved Addresses</Text> : null}
          </View>
        }
        data={SavedAddresses}
        ListFooterComponent={
          IsLoggedIn ? (
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
          ) : (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/login.webp")}
                style={{
                  width: Dimensions.get("screen").width / 2,
                  height: Dimensions.get("screen").width / 2,
                  minWidth: 250,
                  minHeight: 250,
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Text>Please Login to Save Addresses</Text>
              <Button
                status="danger"
                style={{
                  marginTop: 10,
                  width: 200,
                }}
                onPress={() => router.push("Stack/Auth/LoginWithPhone")}
              >
                Log in
              </Button>
            </View>
          )
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
        visible={ConfirmVisible}
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
