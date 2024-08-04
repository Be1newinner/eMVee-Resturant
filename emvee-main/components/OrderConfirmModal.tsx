import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";
import { StoreDetailsContext } from "../Services/StoreDetails/StoreDetailsContext";

export const OrderConfirmModal = ({
  visible,
  setVisible,
  onConfirm,
}): React.ReactElement => {
  const { StoreStatus, timeDiff } = useContext(StoreDetailsContext);
  const [StoreMessage, setStoreMessage] = useState("");

  useEffect(() => {
    let message = "Store will open after ";
    message += timeDiff?.days > 0 ? timeDiff?.days + " days " : "";
    message += timeDiff?.hours > 0 ? timeDiff?.hours + " hours " : "";
    message += timeDiff?.minutes >= 0 ? timeDiff?.minutes + 1 + " minutes" : "";

    setStoreMessage(message);
  }, [StoreStatus, timeDiff]);

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
      <Card disabled={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {!StoreStatus ? "Store Closed!" : "Confirm Order?"}
          </Text>
          <Text>
            {!StoreStatus
              ? StoreMessage
              : "Order Can not be cancelled! \n This is Cash on Delivery Order"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            width: "auto",
          }}
        >
          <Button
            status="basic"
            onPress={() => {
              setVisible(false);
            }}
            style={{
              flex: 1,
            }}
          >
            Cancel
          </Button>
          {StoreStatus ? (
            <Button
              onPress={() => {
                onConfirm();
                setVisible(false);
              }}
              status="danger"
              style={{
                flex: 1,
              }}
            >
              Confirm
            </Button>
          ) : null}
        </View>
      </Card>
    </Modal>
  );
};
