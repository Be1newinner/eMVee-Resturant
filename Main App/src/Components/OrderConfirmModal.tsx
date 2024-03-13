import React from "react";
import { Button, ButtonGroup, Card, Modal, Text } from "@ui-kitten/components";
import { View } from "react-native";

export const OrderConfirmModal = ({
  visible,
  setVisible,
  onConfirm,
}): React.ReactElement => {
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
            Confirm Order?
          </Text>
          <Text>Order Can not be cancelled!</Text>
          <Text>
            This is{" "}
            <Text
              style={{
                fontWeight: 700,
              }}
            >
              Cash on Delivery
            </Text>{" "}
            order!
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
            onPress={() => setVisible(false)}
            style={{
              flex: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              setVisible(false);
              onConfirm();
            }}
            status="danger"
            style={{
              flex: 1,
            }}
          >
            Confirm
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
