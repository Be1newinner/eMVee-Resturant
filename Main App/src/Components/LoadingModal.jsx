import React from "react";
import { Modal, Spinner } from "@ui-kitten/components";
import { View } from "react-native";

export const LoadingModal = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner status="danger" size="giant" />
      </View>
    </Modal>
  );
};
