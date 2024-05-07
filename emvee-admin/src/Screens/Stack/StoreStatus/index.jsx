import { View, Alert } from "react-native";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Layout,
  Popover,
  Text,
  Toggle,
} from "@ui-kitten/components";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../../Infrastructure/firebase.config";

export default function StoreStatus({ navigation }) {
  const [activeChecked, setActiveChecked] = useState(true);
  const [ShowDate, setShowDate] = useState(false);
  const [ShowTime, setShowTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const ChangeStoreStatus = async () => {
    if (activeChecked) {
      setActiveChecked(false);
    } else {
      await resetStoreTimer();
      setActiveChecked(true);
    }
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

  const resetStoreTimer = async () => {
    const currentTimeStamp = new Timestamp.now();
    await changeTimer({ currentTimeStamp });
  };

  const changeTimer = async ({ currentTimeStamp }) => {
    try {
      const docRef = doc(firestoreDB, "ot", "s");
      await updateDoc(docRef, {
        t: currentTimeStamp,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const closeStoreOnline = async function () {
    const date = selectedDate.toLocaleDateString()?.split("/");
    const time = selectedTime?.split(":");
    const newDate = new Date();
    newDate.setDate(Number(date[0]));
    newDate.setMonth(Number(date[1]) - 1);
    newDate.setFullYear(Number(date[2]));
    newDate.setHours(Number(time[0]));
    newDate.setMinutes(Number(time[1]));
    newDate.setSeconds(0);

    const timestamp = new Timestamp.fromDate(newDate);
    // console.log(
    //   date,
    //   time,
    //   newDate.toLocaleString(),
    //   Timestamp.now(),
    //   timestamp
    // );

    const res = await changeTimer({ currentTimeStamp: timestamp });
    if (res) {
      Alert.alert(`Store closed`, `till ${newDate}`);
    }
  };

  useEffect(() => {
    const docRef = doc(firestoreDB, "ot", "s");
    const docSnap = onSnapshot(docRef, (doc) => {
      const time = doc.data()?.t;
      const currentTime = new Date();
      const closedTime = new Date(time?.seconds * 1000);

      const upDate = closedTime.toLocaleDateString();
      const upTime = closedTime?.toLocaleTimeString();

      setSelectedDate(upDate);
      setSelectedTime(upTime);

      // console.log(upDate, upTime);

      currentTime < closedTime
        ? setActiveChecked(false)
        : setActiveChecked(true);
    });
  }, []);

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
              value={selectedDate}
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
            <Button
              status="danger"
              onPress={async () => {
                await closeStoreOnline();
                setActiveChecked(false);
              }}
            >
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
