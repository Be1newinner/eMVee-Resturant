import TopView from "@/components/TopView";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  Pressable,
} from "react-native";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import { LinearGradient } from "expo-linear-gradient";

const AboutUsScreen = () => {
  const handlePressWebsite = () => {
    Linking.openURL("https://emveemart.com/");
  };

  const handlePressDeveloperWebsite = () => {
    Linking.openURL("https://shipsar.in");
  };

  return (
    <LinearGradient
      colors={[GlobalColors.primary, GlobalColors.secondary]}
      style={styles.container}
    >
      <ScrollView>
        <TopView
          title="About Us"
          position="relative"
          color={GlobalColors.text}
        />

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>About eMVee Mart</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>eMVee Mart</Text> is a restaurant based
              in <Text style={styles.bold}>Thingkangphai, Manipur</Text>. We
              offer delicious food for home delivery.
            </Text>

            <Text style={styles.sectionTitle}>Contact Us:</Text>
            <Text style={styles.info}>Email: emveerestaurant1@gmail.com</Text>

            <Pressable onPress={handlePressWebsite}>
              <Text style={styles.link}>emveemart.com</Text>
            </Pressable>

            <View style={styles.row}>
              <Text style={styles.info}>+91 7630-985-985</Text>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  onPress={() => Linking.openURL(`tel:+917630985985`)}
                  name="call"
                  size={30}
                  color={GlobalColors.themeColor}
                  style={styles.icon}
                />
                <FontAwesome5
                  onPress={() =>
                    Linking.openURL(
                      `https://api.whatsapp.com/send/?phone=917630985985&text&type=phone_number&app_absent=0`
                    )
                  }
                  name="whatsapp"
                  size={30}
                  color={GlobalColors.themeColor}
                  style={styles.icon}
                />
              </View>
            </View>

            <Text style={styles.info}>Location: Thingkangphai, Manipur</Text>
          </View>

          {/* Developer Section */}
          <View style={styles.card}>
            <Text style={styles.title}>About the Developer</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Shipsar Developers</Text> is the team
              behind eMVee Mart and many other apps. We specialize in creating
              innovative websites and mobile apps for businesses at affordable
              rates.
            </Text>

            <Pressable onPress={handlePressDeveloperWebsite}>
              <Text style={styles.link}>shipsar.in</Text>
            </Pressable>
            <Text style={styles.info}>info@shipsar.in</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalColors.text,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: GlobalColors.text,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: GlobalColors.secondaryText,
    marginBottom: 15,
  },
  bold: {
    fontWeight: "600",
    color: GlobalColors.text,
  },
  info: {
    fontSize: 16,
    color: GlobalColors.text,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: GlobalColors.linkColor || "#3498db",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
  icon: {
    backgroundColor: GlobalColors.secondary,
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
});

export default AboutUsScreen;
