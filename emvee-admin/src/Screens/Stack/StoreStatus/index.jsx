import { View, Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Button, Input, Text } from "@ui-kitten/components";
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

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function StoreStatus() {
  const [storeStatus, setStoreStatus] = useState({
    activeChecked: true,
    selectedDate: null,
    selectedTime: null,
  });
  const [showPicker, setShowPicker] = useState({ date: false, time: false });

  useEffect(() => {
    const docRef = doc(firestoreDB, "ot", "s");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const time = doc.data()?.t?.seconds;
      if (time) {
        const closedTime = new Date(time * 1000);
        const currentTime = new Date();

        setStoreStatus({
          activeChecked: currentTime > closedTime,
          selectedDate: formatDate(closedTime),
          selectedTime: closedTime.toLocaleTimeString(),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const updateTimer = useCallback(async (timestamp) => {
    try {
      const docRef = doc(firestoreDB, "ot", "s");
      await updateDoc(docRef, { t: timestamp });
    } catch (error) {
      console.error("Failed to update timer:", error);
    }
  }, []);

  const resetStoreTimer = async () => {
    await updateTimer(Timestamp.now());
  };

  const closeStore = async () => {
    const { selectedDate, selectedTime } = storeStatus;
    if (!selectedDate || !selectedTime) return;

    const [day, month, year] = selectedDate.split("/");
    const [hours, minutes] = selectedTime.split(":");

    const newDate = new Date(year, month - 1, day, hours, minutes, 0);
    const timestamp = Timestamp.fromDate(newDate);

    await updateTimer(timestamp);

    Alert.alert("Store closed", `till ${newDate}`);
    setStoreStatus((prevState) => ({ ...prevState, activeChecked: false }));
  };

  const handleDateChange = ({ nativeEvent: { timestamp } }) => {
    setStoreStatus((prevState) => ({
      ...prevState,
      selectedDate: formatDate(new Date(timestamp)),
    }));
    setShowPicker((prevState) => ({ ...prevState, date: false }));
  };

  const handleTimeChange = ({ nativeEvent: { timestamp } }) => {
    const time = new Date(timestamp);
    setStoreStatus((prevState) => ({
      ...prevState,
      selectedTime: `${time.getHours()}:${time.getMinutes()}`,
    }));
    setShowPicker((prevState) => ({ ...prevState, time: false }));
  };

  const { activeChecked, selectedDate, selectedTime } = storeStatus;

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text>
          Store Status:
          <Text style={activeChecked ? styles.active : styles.inactive}>
            {activeChecked ? " Active" : " Inactive"}
          </Text>
        </Text>
      </View>
      <View style={styles.closeStoreContainer}>
        <Text>Close the Store till:</Text>
        <View style={styles.inputRow}>
          <Input
            placeholder="DD/MM/YYYY"
            maxLength={10}
            value={selectedDate}
            onPressIn={() => setShowPicker((prev) => ({ ...prev, date: true }))}
            disabled={!activeChecked}
          />
          <Input
            placeholder="hh:mm"
            value={selectedTime}
            onPressIn={() => setShowPicker((prev) => ({ ...prev, time: true }))}
            disabled={!activeChecked}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button
            status="danger"
            appearance="outline"
            onPress={resetStoreTimer}
            disabled={activeChecked}
          >
            Open Shop
          </Button>
          <Button
            status="danger"
            onPress={closeStore}
            disabled={!activeChecked}
          >
            Close Shop
          </Button>
        </View>
      </View>
      {showPicker.date && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={handleDateChange}
          onCancel={() => setShowPicker((prev) => ({ ...prev, date: false }))}
        />
      )}
      {showPicker.time && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={handleTimeChange}
          onCancel={() => setShowPicker((prev) => ({ ...prev, time: false }))}
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
  active: {
    color: "green",
    fontWeight: "800",
  },
  inactive: {
    color: "red",
    fontWeight: "800",
  },
};
