import React from "react";
import { Card, Modal } from "@ui-kitten/components";
import WebView from "react-native-webview";
import { decode } from "base-64";

export const LoginWithPhoneModal = ({ setVisible, visible = true }) => {
  const userInfo = {
    iss: "phmail",
    aud: "user",
    country_code: "+91",
    phone_no: "8130506284",
  };
  const URI = `https://auth.phone.email/sign-in?countrycode=${userInfo.country_code}&phone_no=${userInfo.phone_no}&redirect_url=&auth_type=4`;

  const phoneAuthJwt = (event) => {
    // Getting encodedJWT
    const token = event.nativeEvent.data;
    const decodedJWT = decode(token.split(".")[1]);
    console.log("token => ", token.split(".")[1].toString("base64"));
    console.log("decode token => ", decodedJWT);
    const finalData = JSON.parse(decodedJWT);

    console.log("finalData", finalData);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onBackdropPress={() => {
        setVisible(false);
      }}
    >
      <Card
        disabled={true}
        style={{
          width: 300,
          height: 500,
        }}
      >
        <WebView
          source={{ uri: URI }}
          style={{
            flex: 1,
          }}
          onMessage={phoneAuthJwt}
        />
      </Card>
    </Modal>
  );
};
