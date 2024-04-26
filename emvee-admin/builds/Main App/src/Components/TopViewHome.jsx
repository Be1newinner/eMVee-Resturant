import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../Infrastructure/GlobalVariables";
import { Input } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { firebaseAuth, firestoreDB } from "../Infrastructure/firebase.config";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";

export const TopViewHome = ({ navigation }) => {
  const saved_addresses = useSelector((state) => state.Address);

  const [SavedAddresses, setSavedAddress] = useState(null);
  const [DefaultAddresses, setDefaultAddress] = useState(0);
  const [CurrentAddresses, setCurrentAddresses] = useState(null);
  const [StoreStatus, setStoreStatus] = useState(true);
  const [passedDate, setpassedDate] = useState(null);
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    const unsub = onSnapshot(doc(firestoreDB, "ot", "s"), (doc) => {
      const data = doc.data();
      if (data?.t) {
        setpassedDate(
          new Timestamp(data.t.seconds, data.t.nanoseconds).toDate()
        );
      }
    });
  }, []);

  useEffect(() => {
    if (passedDate) {
      try {
        const CheckNow = new Date();
        const checkTimeDiffInMs = passedDate - CheckNow;
        if (checkTimeDiffInMs > 0) {
          setStoreStatus(false);
          const intervalId = setInterval(() => {
            const now = new Date();
            const timeDiffInMs = passedDate - now;
            const days = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor(timeDiffInMs % 24);
            const minutes = Math.floor(timeDiffInMs % 60);
            const seconds = Math.floor(timeDiffInMs % 60);

            setTimeDiff({ days, hours, minutes, seconds });
          }, 1000);

          return () => clearInterval(intervalId);
        } else {
          setStoreStatus(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [passedDate]);

  return (
    <View
      style={{
        backgroundColor: GlobalColors.themeColor,
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        gap: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
            Hi, {firebaseAuth?.currentUser?.displayName || "User"}
          </Text>
          <View style={styles.header}>
            <View style={styles.location}>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: -3,
                }}
                onPress={() => navigation.navigate("AddAddressScreen")}
              >
                <MaterialIcons name="place" size={17} color="#fff" />
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  {CurrentAddresses ? (
                    CurrentAddresses?.h.toUpperCase() +
                    ", " +
                    CurrentAddresses?.l.toUpperCase()
                  ) : (
                    <Text
                      style={{
                        fontWeight: 500,
                        color: "#fff",
                      }}
                    >
                      Click to add an address
                    </Text>
                  )}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Ionicons
          name="person-circle-outline"
          size={34}
          color="#fff"
          onPress={() => navigation.navigate("SettingScreen")}
        />
      </View>
      <Input
        placeholder="Search for dishes"
        style={{
          borderRadius: 15,
          marginTop: 5,
        }}
        size="large"
        accessoryRight={
          <AntDesign name="search1" size={24} color="rgba(0,0,0,0.5)" />
        }
        defaultValue=""
        onPressIn={() => navigation.navigate("ProductSearchScreen")}
      />
      {!StoreStatus ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#e53a75",
              alignItems: "center",
              gap: 5,
              padding: 5,
              paddingHorizontal: 20,
              borderRadius: 20,
              elevation: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(255,255,255)",
                height: 10,
                width: 10,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "rgb(255,255,255)",
              }}
            >
              Store Closed{" "}
              {`${timeDiff.days ? timeDiff.days + "," : ""} ${timeDiff.hours}:${
                timeDiff.minutes
              }:${timeDiff.seconds}`}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
  },
  input: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 7,
    borderRadius: 9,
    marginTop: 5,
  },
});
