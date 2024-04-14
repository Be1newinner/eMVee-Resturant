import React from "react";
import { Text, Platform, View, TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NewOrderNotification = () => {
  const [OrderData, setOrderData] = useState(null);
  const notificationListener = useRef();

  useEffect(() => {
    (async function () {
      try {
        const token = await registerForPushNotificationsAsync();

        if (token) {
          alert(token);
          setOrderData(token);
          console.log("THE TOKEN", token);
        }

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            // setOrderData(
            //   notification?.reqaddAdminTokenuest?.content?.data || null
            // );
          });
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      setOrderData(null);
    };
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text>hi screen</Text>
      <TextInput
        value={OrderData}
        onChangeText={(e) => setOrderData(e)}
        placeholder="Your Token here"
      />
    </View>
  );
};

export async function registerForPushNotificationsAsync() {
  let token;

  try {
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
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
    }
  } catch (error) {
    alert(error);
  }
  return token;
}

export default NewOrderNotification;
