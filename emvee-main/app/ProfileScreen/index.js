import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import ProfileTopView from "@/components/ProfileTopView";
import { GlobalColors } from "@/Infrastructure/GlobalVariables";
import { Button, Input } from "@ui-kitten/components";
import TopView from "@/components/TopView";

const ProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [InputState, setInputState] = useState(false);

  const Submit = () => {
    setInputState(!InputState);
  };

  return (
    <ScrollView
      style={{
        height: Dimensions.get("screen").height,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom: 50,
        }}
      >
        <TopView
          navigation={navigation}
          title={"your profile"}
          position="relative"
          color={"rgba(0,0,0,0.8)"}
        />

        <ProfileTopView />
        <View
          style={{
            paddingHorizontal: 20,
            gap: 15,
          }}
        >
          <Input
            label={"Enter your name"}
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full name"
            disabled={!InputState}
            size="large"
          />

          <Input
            label={"Address with Road/Street"}
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            disabled={!InputState}
            size="large"
          />

          <Input
            label={"Landmark"}
            style={styles.input}
            value={landmark}
            onChangeText={setLandmark}
            placeholder="Ex. Near Hospital"
            disabled={!InputState}
            size="large"
          />

          <Input
            label={"Contact number"}
            style={styles.input}
            value={mobileNo}
            onChangeText={setMobileNo}
            placeholder="Enter your mobile no."
            keyboardType="phone-pad"
            disabled={!InputState}
            size="large"
          />

          <Input
            label={"Email ID"}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            disabled={!InputState}
            size="large"
          />

          <Button
            onPress={Submit}
            status="danger"
            style={{
              marginTop: 20,
            }}
          >
            {InputState ? "Save Changes" : "Edit Details"}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginBottom: 7,
    fontWeight: "500",
    color: "#191919",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#C7C8CC",
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
