import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";

import React from "react";
import { ScrollView, View, Text, StyleSheet, Linking } from "react-native";

const AboutUsScreen = ({ navigation }) => {
  const handlePressWebsite = () => {
    Linking.openURL("https://emveemart.com/");
  };

  const handlePressDeveloperWebsite = () => {
    Linking.openURL("https://shipsar.in");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <TopView
          navigation={navigation}
          title="About Us"
          position="relative"
          color="black"
        />

        <View style={styles.container}>
          <Text style={styles.title}>About eMVee Mart</Text>
          <Text style={styles.description}>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              eMVee Mart
            </Text>
            is a restaurant based in Thingkangphai, Manipur. We offer delicious
            food for home delivery.
          </Text>
          <Text style={styles.contact}>Contact Us:</Text>
          <Text>Email: emveerestaurant1@gmail.com</Text>
          <Text style={styles.contact} onPress={handlePressWebsite}>
            emveemart.com
          </Text>
          <Text>+91 7630-985-985</Text>
          <Text style={styles.contact}>Location: Thingkangphai, Manipur</Text>

          <View style={styles.separator} />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 5,
            }}
          >
            About the Developer
          </Text>
          <Text style={styles.description}>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              Shipsar Developers
            </Text>{" "}
            is the team behind the eMVee Mart and Many other apps. We specialize
            in creating innovative Websites and Mobile Apps for businesses at
            affordable rates.
          </Text>
          <Text style={styles.contact} onPress={handlePressDeveloperWebsite}>
            shipsar.in
          </Text>
          <Text>+91 8130-506-284</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    marginBottom: 5,
    color: "blue",
    textDecorationLine: "underline",
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default AboutUsScreen;
