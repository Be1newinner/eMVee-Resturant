// app/NewOrderNotification.js
import React, { useState, useRef, useEffect } from "react";
import { Card, Modal } from "@ui-kitten/components";
import {
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NewOrderNotification = () => {
  const [OrderData, setOrderData] = useState(null);
  const notificationListener = useRef();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const token = await registerForPushNotificationsAsync();

        if (token) {
          await AsyncStorage.setItem("FCM_Token", token);
          console.log("THE TOKEN", token);
        }

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setOrderData(notification?.request?.content?.data || null);
          });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
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
        <View style={{ justifyContent: "center", gap: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              color: "rgb(255,255,255)",
              fontWeight: "500",
            }}
          >
            New Order Received!
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
              <Text style={{ color: "#fff" }}>{OrderData?.name}</Text>
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {new Date(OrderData?.time).toLocaleString()}
              </Text>
            </View>
            <Text style={{ color: "#fff" }}>
              ₹{OrderData?.total}/-
            </Text>
          </View>
          <View>
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
                  <Text style={{ fontSize: 12, color: "#fff" }}>
                    {product?.qty}x {product.t}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#fff" }}>
                    ₹{product?.p}/-
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 1, width: "auto", gap: 10 }}>
          <TouchableOpacity
            onPress={() => setOrderData(null)}
            style={{
              width: 40,
              height: 40,
              padding: 0,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const order = OrderData?.id || "";
              setOrderData(null);
              router.push({ pathname: '/OrdersDetails', params: { order } });
            }}
            style={{
              height: 40,
              padding: 0,
              backgroundColor: "#fff",
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
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
  }
  return token;
}
