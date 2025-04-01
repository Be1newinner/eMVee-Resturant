import { ScrollView, Text, View, StyleSheet } from "react-native";
import { GlobalColors } from "@/infrastructure/GlobalVariables";
import TopView from "@/components/TopView";
import { LinearGradient } from "expo-linear-gradient";

export default function TermsCondition({ navigation }) {
  return (
    <LinearGradient
      colors={[GlobalColors.primary, GlobalColors.secondary]}
      style={styles.container}
    >
      <ScrollView>
        <TopView
          navigation={navigation}
          title="Terms and Conditions"
          position="relative"
          color={GlobalColors.text}
        />

        <View style={styles.content}>
          {/* Section Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to emveemart.com!</Text>
            <Text style={styles.text}>
              These terms and conditions outline the rules and regulations for
              the use of eMVee Restaurant's Website, located at{" "}
              <Text style={styles.link}>https://emveemart.com/</Text>.
            </Text>
            <Text style={styles.text}>
              By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use emveemart.com if you do not
              agree to all of the terms and conditions stated on this page.
            </Text>
          </View>

          {/* Cookies Section */}
          <View style={styles.card}>
            <Text style={styles.heading}>Cookies</Text>
            <Text style={styles.text}>
              We employ the use of cookies. By accessing emveemart.com, you
              agreed to use cookies in agreement with eMVee Restaurant's Privacy
              Policy.
            </Text>
            <Text style={styles.text}>
              Most interactive websites use cookies to let us retrieve the
              user's details for each visit. Cookies enable the functionality of
              certain areas to make it easier for people visiting our website.
            </Text>
          </View>

          {/* License Section */}
          <View style={styles.card}>
            <Text style={styles.heading}>License</Text>
            <Text style={styles.text}>
              Unless otherwise stated, eMVee Restaurant and/or its licensors own
              the intellectual property rights for all material on
              emveemart.com. All intellectual property rights are reserved.
            </Text>
            <Text style={styles.text}>You must not:</Text>
            <View style={styles.list}>
              <Text>• Republish material from emveemart.com</Text>
              <Text>
                • Sell, rent or sub-license material from emveemart.com
              </Text>
              <Text>• Reproduce, duplicate or copy material</Text>
              <Text>• Redistribute content</Text>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.card}>
            <Text style={styles.heading}>Comments</Text>
            <Text style={styles.text}>
              Parts of this website offer an opportunity for users to post and
              exchange opinions. eMVee Restaurant does not filter, edit, publish
              or review Comments prior to their appearance on the website.
            </Text>
            <Text style={styles.text}>
              eMVee Restaurant shall not be liable for Comments or any liability
              arising from the use of this website.
            </Text>
          </View>

          {/* Hyperlinking Section */}
          <View style={styles.card}>
            <Text style={styles.heading}>Hyperlinking to our Content</Text>
            <Text style={styles.text}>
              The following organizations may link to our Website without prior
              written approval:
            </Text>
            <View style={styles.list}>
              <Text>• Government agencies</Text>
              <Text>• Search engines</Text>
              <Text>• News organizations</Text>
              <Text>• Online directory distributors</Text>
            </View>
          </View>

          {/* Disclaimer Section */}
          <View style={styles.card}>
            <Text style={styles.heading}>Disclaimer</Text>
            <Text style={styles.text}>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties, and conditions relating to our
              website and the use of this website.
            </Text>
            <Text style={styles.text}>
              As long as the website and the information and services on the
              website are provided free of charge, we will not be liable for any
              loss or damage.
            </Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalColors.text,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: GlobalColors.text,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: GlobalColors.secondaryText,
    marginBottom: 15,
  },
  link: {
    color: GlobalColors.linkColor || "#3498db",
    textDecorationLine: "underline",
  },
  list: {
    marginLeft: 15,
    marginTop: 10,
  },
});
