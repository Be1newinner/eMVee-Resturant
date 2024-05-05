import { View } from "react-native";
import { useState } from "react";
import { Button, Input, Text, Toggle } from "@ui-kitten/components";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function StoreStatus({ navigation }) {
  const [activeChecked, setActiveChecked] = useState(false);
  const [ShowDate, setShowDate] = useState(false);
  const [ShowTime, setShowTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const ChangeStoreStatus = () => {
    activeChecked ? setActiveChecked(false) : setActiveChecked(true);
  };

  const setDate = ({ nativeEvent: { timestamp } }) => {
    const date = new Date(timestamp);
    setSelectedDate(date);
    setShowDate(false);
  };

  const setTime = ({ nativeEvent: { timestamp } }) => {
    const time = new Date(timestamp);
    const timeArray = time
      .toLocaleString()
      .split(",")[1]
      .replaceAll(" ", "")
      .split(":");
    setSelectedTime(timeArray[0] + ":" + timeArray[1]);
    setShowTime(false);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexWrap: "wrap",
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>Store Status : </Text>
        <Toggle
          status="danger"
          checked={activeChecked}
          onChange={ChangeStoreStatus}
        />
      </View>
      {!activeChecked ? (
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>Store Closed till : </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 5,
            }}
          >
            <Input
              placeholder="DD/MM/YYYY"
              maxLength={10}
              value={selectedDate?.toLocaleDateString()}
              onChangeText={(e) => {
                console.log("asd => ", typeof e);
              }}
              onPressIn={() => setShowDate(true)}
            />
            <Input
              placeholder="hh:mm"
              maxLength={5}
              onChangeText={(e) => {
                console.log("asd => ", typeof e);
              }}
              onPressIn={() => setShowTime(true)}
              value={selectedTime}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Button
              status="danger"
              appearance="outline"
              onPress={() => setActiveChecked(true)}
            >
              Cancel
            </Button>
            <Button status="danger" onPress={() => setActiveChecked(false)}>
              Close Shop
            </Button>
          </View>
        </View>
      ) : null}

      {ShowDate ? (
        <RNDateTimePicker
          mode="date"
          value={new Date()}
          onChange={(e) => setDate(e)}
          onTouchCancel={() => setShowDate(false)}
          minimumDate={new Date()}
        />
      ) : null}
      {ShowTime ? (
        <RNDateTimePicker
          mode="time"
          value={new Date()}
          onChange={(e) => setTime(e)}
          onTouchCancel={() => setShowTime(false)}
          minimumDate={new Date()}
          minuteInterval={30}
          display="spinner"
        />
      ) : null}
    </View>
  );
}

export const DatePicker = () => {};
