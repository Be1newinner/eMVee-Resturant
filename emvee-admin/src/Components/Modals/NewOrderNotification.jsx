import React from "react";
import { Card, Modal } from "@ui-kitten/components";
import {
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalColors } from "../../Infrastructure/GlobalVariables";
import { useState, useRef, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, realtimeDB } from "../../Infrastructure/firebase.config";
import { ref, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NewOrderNotification = ({ navigation = null }) => {
  const [OrderData, setOrderData] = useState(null);
  const notificationListener = useRef();

  useEffect(() => {
    console.log("SOMETHING");
    const tdf =
      process.env.EXPO_PUBLIC_u2 +
      "" +
      process.env.EXPO_PUBLIC_u9 +
      "" +
      process.env.EXPO_PUBLIC_u1 +
      "" +
      process.env.EXPO_PUBLIC_u0;

    const addAdminToken = async (data) => {
      await set(ref(realtimeDB, `token/${data}`), data);
    };

    try {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (user?.uid == tdf) {
          const token = await registerForPushNotificationsAsync();

          if (token) {
            await AsyncStorage.setItem("FCM_Token", token);
            await addAdminToken(token);
            console.log("THE TOKEN", token);
          }

          notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
              setOrderData(
                notification?.reqaddAdminTokenuest?.content?.data || null
              );
            });
        }
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      setOrderData(null);
    };
  }, []);

  return (
    <Modal
      visible={OrderData?.items?.length > 0}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onBackdropPress={() => {
        setOrderData(null);
      }}
    >
      <Card
        disabled={true}
        style={{
          backgroundColor: GlobalColors.themeColor,
          borderColor: "rgba(0,0,0,0)",
          width: Dimensions.get("screen").width - 50,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "rgb(255,255,255)",
              fontWeight: 500,
            }}
          >
            New Order Recieved!
          </Text>
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                {OrderData?.name}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                {new Date(OrderData?.time).toLocaleString()}
              </Text>
            </View>
            <Text
              style={{
                color: "#fff",
              }}
            >
              ₹{OrderData?.total}/-
            </Text>
          </View>
          <View style={{}}>
            {OrderData?.items
              ?.filter((e) => e.qty > 0)
              ?.map((product, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    flex: 1,
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    {product?.qty}x {product.t}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    ₹{product?.p}/-
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            width: "auto",
            gap: 10,
          }}
        >
          <TouchableOpacity
            status="basic"
            onPress={() => setOrderData(null)}
            style={{
              width: 40,
              height: 40,
              padding: 0,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            status="basic"
            onPress={() => {
              const order = OrderData?.id || "";
              setOrderData(null);
              navigation.navigate("OrdersDetails", { order });
            }}
            style={{
              height: 40,
              padding: 0,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              flex: 1,
            }}
          >
            <Text>View Order</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </Modal>
  );
};

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
  }
  return token;
}
