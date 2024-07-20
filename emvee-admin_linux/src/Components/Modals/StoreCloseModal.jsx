import React from "react";
import { Card, Modal, Text } from "@ui-kitten/components";
import { View } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const StoreCloseModal = ({
  visible,
  setVisible,
  onConfirm = () => null,
}) => {
  const setDate = ({ nativeEvent: { timestamp } }) => {
    console.log("date => ", timestamp);
    const date = new Date(timestamp);
    console.log("date2 => ", date.toLocaleDateString());
  };

  const setTime = ({ nativeEvent: { timestamp } }) => {
    console.log("time -> ", timestamp);
    const date = new Date(timestamp);
    console.log("time2 => ", date.toLocaleTimeString());
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

          <RNDateTimePicker
            mode="date"
            value={new Date()}
            onChange={setDate}
            minimumDate={new Date()}
          />
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            onChange={setTime}
            display="spinner"
            themeVariant="light"
            minuteInterval={30}
            is24Hour={false}
            disabled
          />
        </View>
      </Card>
    </Modal>
  );
};
