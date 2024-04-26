import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Select,
  Text,
  SelectItem,
} from "@ui-kitten/components";
import { View } from "react-native";
import OrderTime from "../../Services/Offline/OrderTime";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const StoreCloseModal = ({
  visible,
  setVisible,
  onConfirm = () => null,
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
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Closing Store!
          </Text>
          <Text>Please Select when {"\n"}the store will open again?</Text>

          <RNDateTimePicker mode="date" />
          <RNDateTimePicker mode="time" />

        </View>
      </Card>
    </Modal>
  );
};
