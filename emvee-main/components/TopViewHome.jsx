import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../Infrastructure/GlobalVariables";
import { Input } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { firebaseAuth } from "../Infrastructure/firebase.config";
import { StoreDetailsContext } from "../Services/StoreDetails/StoreDetailsContext";

export const TopViewHome = ({ navigation }) => {
  const saved_addresses = useSelector((state) => state.Address);

  const [SavedAddresses, setSavedAddress] = useState(null);
  const [DefaultAddresses, setDefaultAddress] = useState(0);
  const [CurrentAddresses, setCurrentAddresses] = useState(null);

  const { StoreStatus, timeDiff } = useContext(StoreDetailsContext);

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
              {`${timeDiff.days ? timeDiff.days + " day/s ," : ""} ${
                timeDiff.hours
              }:${timeDiff.minutes}:${timeDiff.seconds}`}
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
