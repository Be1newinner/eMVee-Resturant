import React from "react";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { View } from "react-native";

export const OrderModal = ({
  visible,
  setVisible,
  onConfirm = () => null,
  title = "",
  subTitle = "",
}) => {
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
            {title}
          </Text>
          {subTitle && <Text>{subTitle}</Text>}
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
            No
          </Button>
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
            Yes
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
