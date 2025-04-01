import { ScrollView, Text, View, StyleSheet } from "react-native";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import TopView from "@/components/TopView";
import { LinearGradient } from "expo-linear-gradient";

export default function PrivacyPolicy({ navigation }) {
  return (
    <LinearGradient
      colors={[GlobalColors.primary, GlobalColors.secondary]}
      style={styles.container}
    >
      <ScrollView>
        <TopView
          navigation={navigation}
          title="Privacy Policy"
          position="relative"
          color={GlobalColors.text}
        />

        <View style={styles.content}>
          {/* Introduction Card */}
          <View style={styles.card}>
            <Text style={styles.text}>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </Text>
            <Text style={styles.text}>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </Text>
          </View>

          {/* Interpretation and Definitions Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Interpretation and Definitions</Text>
            <Text style={styles.subheading}>Interpretation</Text>
            <Text style={styles.text}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </Text>
            <Text style={styles.subheading}>Definitions</Text>
            <Text style={styles.text}>
              For the purposes of this Privacy Policy:
            </Text>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Account</Text>
              <Text style={styles.text}>
                means a unique account created for You to access our Service or
                parts of our Service.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Affiliate</Text>
              <Text style={styles.text}>
                means an entity that controls, is controlled by or is under
                common control with a party, where "control" means ownership of
                50% or more of the shares, equity interest or other securities
                entitled to vote for election of directors or other managing
                authority.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Application</Text>
              <Text style={styles.text}>
                refers to eMVee Resturant, the software program provided by the
                Company.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Company</Text>
              <Text style={styles.text}>
                (referred to as either "the Company", "We", "Us" or "Our" in
                this Agreement) refers to eMVee Resturant, Thingkangphai,
                Churachandpur, Manipur 795006, India.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Country</Text>
              <Text style={styles.text}>refers to: Manipur, India</Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Device</Text>
              <Text style={styles.text}>
                means any device that can access the Service such as a computer,
                a cellphone or a digital tablet.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Personal Data</Text>
              <Text style={styles.text}>
                is any information that relates to an identified or identifiable
                individual.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>Service</Text>
              <Text style={styles.text}>refers to the Application.</Text>
            </View>
          </View>

          {/* Data Collection Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>
              Collecting and Using Your Personal Data
            </Text>
            <Text style={styles.subheading}>Types of Data Collected</Text>
            <Text style={styles.subheading2}>Personal Data</Text>
            <Text style={styles.text}>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Email address</Text>
              <Text style={styles.listItem}>• First name and last name</Text>
              <Text style={styles.listItem}>• Phone number</Text>
              <Text style={styles.listItem}>
                • Address, State, Province, ZIP/Postal code, City
              </Text>
              <Text style={styles.listItem}>• Usage Data</Text>
            </View>
          </View>

          {/* Usage Data Card */}
          <View style={styles.card}>
            <Text style={styles.subheading2}>Usage Data</Text>
            <Text style={styles.text}>
              Usage Data is collected automatically when using the Service.
            </Text>
            <Text style={styles.text}>
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </Text>
            <Text style={styles.text}>
              When You access the Service by or through a mobile device, We may
              collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device
              unique ID, the IP address of Your mobile device, Your mobile
              operating system, the type of mobile Internet browser You use,
              unique device identifiers and other diagnostic data.
            </Text>
          </View>

          {/* Third-Party Social Media Card */}
          <View style={styles.card}>
            <Text style={styles.subheading2}>
              Information from Third-Party Social Media Services
            </Text>
            <Text style={styles.text}>
              The Company allows You to create an account and log in to use the
              Service through the following Third-party Social Media Services:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Google</Text>
              <Text style={styles.listItem}>• Facebook</Text>
              <Text style={styles.listItem}>• Instagram</Text>
              <Text style={styles.listItem}>• Twitter</Text>
              <Text style={styles.listItem}>• LinkedIn</Text>
            </View>
          </View>

          {/* Use of Personal Data Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Use of Your Personal Data</Text>
            <Text style={styles.text}>
              The Company may use Personal Data for the following purposes:
            </Text>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>
                To provide and maintain our Service
              </Text>
              <Text style={styles.text}>
                including to monitor the usage of our Service.
              </Text>
            </View>
            <View style={styles.definitionItem}>
              <Text style={styles.definitionTerm}>To manage Your Account:</Text>
              <Text style={styles.text}>
                to manage Your registration as a user of the Service. The
                Personal Data You provide can give You access to different
                functionalities of the Service that are available to You as a
                registered user.
              </Text>
            </View>
          </View>

          {/* Retention Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Retention of Your Personal Data</Text>
            <Text style={styles.text}>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </Text>
          </View>

          {/* Security Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Security of Your Personal Data</Text>
            <Text style={styles.text}>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </Text>
          </View>

          {/* Contact Us Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Contact Us</Text>
            <Text style={styles.text}>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• By email: info@shipsar.in</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

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
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: GlobalColors.text,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    color: GlobalColors.text,
    marginBottom: 8,
    marginTop: 15,
  },
  subheading2: {
    fontSize: 17,
    fontWeight: "600",
    color: GlobalColors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: GlobalColors.secondaryText,
    marginBottom: 15,
  },
  list: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: GlobalColors.secondaryText,
    marginBottom: 8,
  },
  definitionItem: {
    marginBottom: 10,
  },
  definitionTerm: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalColors.text,
    marginBottom: 5,
  },
  link: {
    color: GlobalColors.linkColor || "#3498db",
    textDecorationLine: "underline",
  },
});
