import { View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Button, Input, Text, Toggle } from "@ui-kitten/components";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../../Infrastructure/firebase.config";

const DateTimePicker = ({ mode, value, onChange, onCancel }) => (
  <RNDateTimePicker
    mode={mode}
    value={value}
    onChange={onChange}
    onTouchCancel={onCancel}
    minimumDate={new Date()}
    display="spinner"
    minuteInterval={30}
  />
);

export default function StoreStatus({ navigation }) {
  const [activeChecked, setActiveChecked] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const docRef = doc(firestoreDB, "ot", "s");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const time = doc.data()?.t;
      const currentTime = new Date();
      const closedTime = new Date(time?.seconds * 1000);

      setSelectedDate(closedTime.toLocaleDateString());
      setSelectedTime(closedTime.toLocaleTimeString());

      setActiveChecked(currentTime >= closedTime);
    });

    return () => unsubscribe();
  }, []);

  const toggleStoreStatus = async () => {
    if (activeChecked) {
      await resetStoreTimer();
      setActiveChecked(false);
    } else {
      setActiveChecked(true);
    }
  };

  const resetStoreTimer = async () => {
    const currentTimeStamp = Timestamp.now();
    await updateTimer(currentTimeStamp);
  };

  const updateTimer = async (currentTimeStamp) => {
    try {
      const docRef = doc(firestoreDB, "ot", "s");
      await updateDoc(docRef, { t: currentTimeStamp });
    } catch (error) {
      console.error("Failed to update timer:", error);
    }
  };

  const closeStore = async () => {
    if (!selectedDate || !selectedTime) return;

    const [day, month, year] = selectedDate.split("/");
    const [hours, minutes] = selectedTime.split(":");

    const newDate = new Date(year, month - 1, day, hours, minutes, 0);
    const timestamp = Timestamp.fromDate(newDate);

    const success = await updateTimer(timestamp);
    if (success) {
      Alert.alert("Store closed", `till ${newDate}`);
      setActiveChecked(false);
    }
  };

  const handleDateChange = ({ nativeEvent: { timestamp } }) => {
    setSelectedDate(new Date(timestamp).toLocaleDateString());
    setShowDatePicker(false);
  };

  const handleTimeChange = ({ nativeEvent: { timestamp } }) => {
    const time = new Date(timestamp);
    setSelectedTime(`${time.getHours()}:${time.getMinutes()}`);
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text>Store Status:</Text>
        <Toggle
          status="danger"
          checked={activeChecked}
          onChange={toggleStoreStatus}
        />
      </View>
      {!activeChecked && (
        <View style={styles.closeStoreContainer}>
          <Text>Store Closed till:</Text>
          <View style={styles.inputRow}>
            <Input
              placeholder="DD/MM/YYYY"
              maxLength={10}
              value={selectedDate}
              onPressIn={() => setShowDatePicker(true)}
            />
            <Input
              placeholder="hh:mm"
              maxLength={5}
              value={selectedTime}
              onPressIn={() => setShowTimePicker(true)}
            />
          </View>
          <View style={styles.buttonRow}>
            <Button
              status="danger"
              appearance="outline"
              onPress={() => setActiveChecked(true)}
            >
              Cancel
            </Button>
            <Button status="danger" onPress={closeStore}>
              Close Shop
            </Button>
          </View>
        </View>
      )}

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={handleDateChange}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={handleTimeChange}
          onCancel={() => setShowTimePicker(false)}
        />
      )}
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "#eee",
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeStoreContainer: {
    flexDirection: "column",
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
};
