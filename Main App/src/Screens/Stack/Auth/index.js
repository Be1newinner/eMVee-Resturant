import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignInScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full name"
      />

      <Text style={styles.header}>House / Office No.</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      <Text style={styles.header}>Area, Landmark</Text>
      <TextInput
        style={styles.input}
        value={landmark}
        onChangeText={setLandmark}
        placeholder="Aslali, e.g. Near Hospital"
      />

      <Text style={styles.header}>Mobile no.</Text>
      <TextInput
        style={styles.input}
        value={mobileNo}
        onChangeText={setMobileNo}
        placeholder="Enter your mobile no."
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("BottomTab")}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 7,
    fontWeight: "500",
    color: "#191919",
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#C7C8CC",
    padding: 5,
  },
  btn: {
    backgroundColor: "#e5002b",
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
