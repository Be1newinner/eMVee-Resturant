// import { ScrollView, Text, View } from "react-native";
// import { GlobalColors } from "@/infrastructure/GlobalVariables";
// import TopView from "@/components/TopView";

// export default function TermsCondition({ navigation }) {
//   return (
//     <ScrollView
//       style={{
//         flex: 1,
//         backgroundColor: GlobalColors.primary,
//       }}
//     >
//       <View>
//         <TopView
//           navigation={navigation}
//           title="Terms and Condition"
//           position="relative"
//           color="black"
//         />

//         <View
//           style={{
//             padding: 10,
//             paddingTop: 20,
//             gap: 10,
//           }}
//         >
//           <Text>Welcome to emveemart.com!</Text>
//           <Text>
//             These terms and conditions outline the rules and regulations for the
//             use of eMVee Resturant's Website, located at https://emveemart.com/.
//           </Text>
//           <Text>
//             By accessing this website we assume you accept these terms and
//             conditions. Do not continue to use emveemart.com if you do not agree
//             to take all of the terms and conditions stated on this page.
//           </Text>
//           <Text>
//             The following terminology applies to these Terms and Conditions,
//             Privacy Statement and Disclaimer Notice and all Agreements:
//             "Client", "You" and "Your" refers to you, the person log on this
//             website and compliant to the Company's terms and conditions. "The
//             Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
//             "Party", "Parties", or "Us", refers to both the Client and
//             ourselves. All terms refer to the offer, acceptance and
//             consideration of payment necessary to undertake the process of our
//             assistance to the Client in the most appropriate manner for the
//             express purpose of meeting the Client's needs in respect of
//             provision of the Company's stated services, in accordance with and
//             subject to, prevailing law of in. Any use of the above terminology
//             or other words in the singular, plural, capitalization and/or he/she
//             or they, are taken as interchangeable and therefore as referring to
//             same.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>Cookies</Text>

//           <Text>
//             We employ the use of cookies. By accessing emveemart.com, you agreed
//             to use cookies in agreement with the eMVee Resturant's Privacy
//             Policy.{" "}
//           </Text>
//           <Text>
//             Most interactive websites use cookies to let us retrieve the user's
//             details for each visit. Cookies are used by our website to enable
//             the functionality of certain areas to make it easier for people
//             visiting our website. Some of our affiliate/advertising partners may
//             also use cookies.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>License</Text>

//           <Text>
//             Unless otherwise stated, eMVee Resturant and/or its licensors own
//             the intellectual property rights for all material on emveemart.com.
//             All intellectual property rights are reserved. You may access this
//             from emveemart.com for your own personal use subjected to
//             restrictions set in these terms and conditions.
//           </Text>
//           <Text>You must not:</Text>

//           <View
//             style={{
//               paddingRight: 10,
//             }}
//           >
//             <Text>Republish material from emveemart.com</Text>
//             <Text>Sell, rent or sub-license material from emveemart.com</Text>
//             <Text>
//               Reproduce, duplicate or copy material from emveemart.com
//             </Text>
//             <Text>Redistribute content from emveemart.com</Text>
//           </View>

//           <Text>
//             This Agreement shall begin on the date hereof. Our Terms and
//             Conditions were created with the help of the .
//           </Text>
//           <Text>
//             Parts of this website offer an opportunity for users to post and
//             exchange opinions and information in certain areas of the website.
//             eMVee Resturant does not filter, edit, publish or review Comments
//             prior to their presence on the website. Comments do not reflect the
//             views and opinions of eMVee Resturant,its agents and/or affiliates.
//             Comments reflect the views and opinions of the person who post their
//             views and opinions. To the extent permitted by applicable laws,
//             eMVee Resturant shall not be liable for the Comments or for any
//             liability, damages or expenses caused and/or suffered as a result of
//             any use of and/or posting of and/or appearance of the Comments on
//             this website.
//           </Text>
//           <Text>
//             eMVee Resturant reserves the right to monitor all Comments and to
//             remove any Comments which can be considered inappropriate, offensive
//             or causes breach of these Terms and Conditions.
//           </Text>
//           <Text>You warrant and represent that:</Text>
//           <View
//             style={{
//               paddingRight: 10,
//             }}
//           >
//             <Text>
//               You are entitled to post the Comments on our website and have all
//               necessary licenses and consents to do so;
//             </Text>
//             <Text>
//               The Comments do not invade any intellectual property right,
//               including without limitation copyright, patent or trademark of any
//               third party;
//             </Text>
//             <Text>
//               The Comments do not contain any defamatory, libelous, offensive,
//               indecent or otherwise unlawful material which is an invasion of
//               privacy
//             </Text>
//             <Text>
//               The Comments will not be used to solicit or promote business or
//               custom or present commercial activities or unlawful activity.
//             </Text>
//           </View>
//           <Text>
//             You hereby grant eMVee Resturant a non-exclusive license to use,
//             reproduce, edit and authorize others to use, reproduce and edit any
//             of your Comments in any and all forms, formats or media.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>Hyperlinking to our Content</Text>

//           <Text>
//             The following organizations may link to our Website without prior
//             written approval:
//           </Text>
//           <View
//             style={{
//               paddingRight: 10,
//             }}
//           >
//             <Text>Government agencies;</Text>
//             <Text>Search engines;</Text>
//             <Text>News organizations;</Text>
//             <Text>
//               Online directory distributors may link to our Website in the same
//               manner as they hyperlink to the Websites of other listed
//               businesses; and
//             </Text>
//             <Text>
//               System wide Accredited Businesses except soliciting non-profit
//               organizations, charity shopping malls, and charity fundraising
//               groups which may not hyperlink to our Web site.
//             </Text>
//           </View>
//           <Text>
//             These organizations may link to our home page, to publications or to
//             other Website information so long as the link: (a) is not in any way
//             deceptive; (b) does not falsely imply sponsorship, endorsement or
//             approval of the linking party and its products and/or services; and
//             (c) fits within the context of the linking party's site.
//           </Text>
//           <Text>
//             We may consider and approve other link requests from the following
//             types of organizations:
//           </Text>
//           <View
//             style={{
//               paddingRight: 10,
//             }}
//           >
//             <Text>
//               commonly-known consumer and/or business information sources;
//             </Text>
//             <Text>dot.com community sites;</Text>
//             <Text>associations or other groups representing charities;</Text>
//             <Text>online directory distributors;</Text>
//             <Text>internet portals;</Text>
//             <Text>accounting, law and consulting firms; and</Text>
//             <Text>educational institutions and trade associations.</Text>
//           </View>
//           <Text>
//             We will approve link requests from these organizations if we decide
//             that: (a) the link would not make us look unfavorably to ourselves
//             or to our accredited businesses; (b) the organization does not have
//             any negative records with us; (c) the benefit to us from the
//             visibility of the hyperlink compensates the absence of eMVee
//             Resturant; and (d) the link is in the context of general resource
//             information.
//           </Text>
//           <Text>
//             These organizations may link to our home page so long as the link:
//             (a) is not in any way deceptive; (b) does not falsely imply
//             sponsorship, endorsement or approval of the linking party and its
//             products or services; and (c) fits within the context of the linking
//             party's site.
//           </Text>
//           <Text>
//             If you are one of the organizations listed in paragraph 2 above and
//             are interested in linking to our website, you must inform us by
//             sending an e-mail to eMVee Resturant. Please include your name, your
//             organization name, contact information as well as the URL of your
//             site, a list of any URLs from which you intend to link to our
//             Website, and a list of the URLs on our site to which you would like
//             to link. Wait 2-3 weeks for a response.
//           </Text>
//           <Text>
//             Approved organizations may hyperlink to our Website as follows:
//           </Text>
//           <View
//             style={{
//               paddingRight: 10,
//             }}
//           >
//             <Text>By use of our corporate name; or</Text>
//             <Text>
//               By use of the uniform resource locator being linked to; or
//             </Text>
//             <Text>
//               By use of any other description of our Website being linked to
//               that makes sense within the context and format of content on the
//               linking party's site.
//             </Text>
//           </View>
//           <Text>
//             No use of eMVee Resturant's logo or other artwork will be allowed
//             for linking absent a trademark license agreement.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>iFrames</Text>

//           <Text>
//             Without prior approval and written permission, you may not create
//             frames around our Webpages that alter in any way the visual
//             presentation or appearance of our Website.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>Content Liability</Text>

//           <Text>
//             We shall not be hold responsible for any content that appears on
//             your Website. You agree to protect and defend us against all claims
//             that is rising on your Website. No link(s) should appear on any
//             Website that may be interpreted as libelous, obscene or criminal, or
//             which infringes, otherwise violates, or advocates the infringement
//             or other violation of, any third party rights.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>Reservation of Rights</Text>

//           <Text>
//             We reserve the right to request that you remove all links or any
//             particular link to our Website. You approve to immediately remove
//             all links to our Website upon request. We also reserve the right to
//             amen these terms and conditions and it's linking policy at any time.
//             By continuously linking to our Website, you agree to be bound to and
//             follow these linking terms and conditions.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>
//             Removal of links from our website
//           </Text>

//           <Text>
//             If you find any link on our Website that is offensive for any
//             reason, you are free to contact and inform us any moment. We will
//             consider requests to remove links but we are not obligated to or so
//             or to respond to you directly.
//           </Text>
//           <Text>
//             We do not ensure that the information on this website is correct, we
//             do not warrant its completeness or accuracy; nor do we promise to
//             ensure that the website remains available or that the material on
//             the website is kept up to date.
//           </Text>

//           <Text style={{ fontWeight: 700 }}>Disclaimer</Text>

//           <Text>
//             To the maximum extent permitted by applicable law, we exclude all
//             representations, warranties and conditions relating to our website
//             and the use of this website. Nothing in this disclaimer will:
//           </Text>
//           <View
//             style={{
//               paddingRight: 10,
//             }}
//           >
//             <Text>
//               limit or exclude our or your liability for death or personal
//               injury;
//             </Text>
//             <Text>
//               limit or exclude our or your liability for fraud or fraudulent
//               misrepresentation;
//             </Text>
//             <Text>
//               limit any of our or your liabilities in any way that is not
//               permitted under applicable law; or
//             </Text>
//             <Text>
//               exclude any of our or your liabilities that may not be excluded
//               under applicable law.
//             </Text>
//           </View>
//           <Text>
//             The limitations and prohibitions of liability set in this Section
//             and elsewhere in this disclaimer: (a) are subject to the preceding
//             paragraph; and (b) govern all liabilities arising under the
//             disclaimer, including liabilities arising in contract, in tort and
//             for breach of statutory duty.
//           </Text>
//           <Text>
//             As long as the website and the information and services on the
//             website are provided free of charge, we will not be liable for any
//             loss or damage of any nature.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

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
