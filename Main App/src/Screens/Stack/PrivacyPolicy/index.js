import { ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";

export default function PrivacyPolicy({ navigation }) {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <TopView
          navigation={navigation}
          title="Privacy Policy"
          position="relative"
          color="black"
        />

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            gap: 5,
          }}
        >
          <Text className="MsoNormal">
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </Text>
          <Text className="MsoNormal">
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.{" "}
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16, color: "blue" }}>
            Interpretation and Definitions
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>Interpretation</Text>
          <Text className="MsoNormal">
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>Definitions</Text>
          <Text className="MsoNormal">
            For the purposes of this Privacy Policy:
          </Text>
          <Text className="MsoListParagraphCxSpFirst">
            <Text style={{ fontWeight: 600 }}>Account</Text> means a unique
            account created for You to access our Service or parts of our
            Service.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Affiliate</Text> means an entity
            that controls, is controlled by or is under common control with a
            party, where "control" means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Application</Text> refers to eMVee
            Resturant, the software program provided by the Company.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Company</Text> (referred to as
            either "the Company", "We", "Us" or "Our" in this Agreement) refers
            to eMVee Resturant, Thingkangphai, Churachandpur, Manipur 795006,
            India.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Country</Text> refers to: Manipur,
            India
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Device</Text> means any device
            that can access the Service such as a computer, a cellphone or a
            digital tablet.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Personal Data</Text> is any
            information that relates to an identified or identifiable
            inViewidual.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Service</Text> refers to the
            Application.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Service Provider</Text> means any
            natural or legal person who processes the data on behalf of the
            Company. It refers to third-party companies or inViewiduals employed
            by the Company to facilitate the Service, to provide the Service on
            behalf of the Company, to perform services related to the Service or
            to assist the Company in analyzing how the Service is used.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>
              Third-party Social Media Service
            </Text>
            refers to any website or any social network website through which a
            User can log in or create an account to use the Service.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>Usage Data</Text> refers to data
            collected automatically, either generated by the use of the Service
            or from the Service infrastructure itself (for example, the duration
            of a page visit).
          </Text>
          <Text className="MsoListParagraphCxSpLast">
            <Text style={{ fontWeight: 600 }}>You</Text> means the inViewidual
            accessing or using the Service, or the company, or other legal
            entity on behalf of which such inViewidual is accessing or using the
            Service, as applicable.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Collecting and Using Your Personal Data
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Types of Data Collected
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>Personal Data</Text>
          <Text className="MsoNormal">
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </Text>
          <Text className="MsoListParagraphCxSpFirst">Email address</Text>
          <Text className="MsoListParagraphCxSpMiddle">
            First name and last name
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">Phone number</Text>
          <Text className="MsoListParagraphCxSpMiddle">
            Address, State, Province, ZIP/Postal code, City
          </Text>
          <Text className="MsoListParagraphCxSpLast">Usage Data</Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>Usage Data</Text>
          <Text className="MsoNormal">
            Usage Data is collected automatically when using the Service.
          </Text>
          <Text className="MsoNormal">
            Usage Data may include information such as Your Device's Internet
            Protocol address (e.g. IP address), browser type, browser version,
            the pages of our Service that You visit, the time and date of Your
            visit, the time spent on those pages, unique device identifiers and
            other diagnostic data.
          </Text>
          <Text className="MsoNormal">
            When You access the Service by or through a mobile device, We may
            collect certain information automatically, including, but not
            limited to, the type of mobile device You use, Your mobile device
            unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data.
          </Text>
          <Text className="MsoNormal">
            We may also collect information that Your browser sends whenever You
            visit our Service or when You access the Service by or through a
            mobile device.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            Information from Third-Party Social Media Services
          </Text>
          <Text className="MsoNormal">
            The Company allows You to create an account and log in to use the
            Service through the following Third-party Social Media Services:
          </Text>
          <Text className="MsoListBulletCxSpFirst">Google</Text>
          <Text className="MsoListBulletCxSpMiddle">Facebook</Text>
          <Text className="MsoListBulletCxSpMiddle">Instagram</Text>
          <Text className="MsoListBulletCxSpMiddle">Twitter</Text>
          <Text className="MsoListBulletCxSpLast">LinkedIn</Text>
          <Text className="MsoNormal">
            If You decide to register through or otherwise grant us access to a
            Third-Party Social Media Service, We may collect Personal data that
            is already associated with Your Third-Party Social Media Service's
            account, such as Your name, Your email address, Your activities or
            Your contact list associated with that account.
          </Text>
          <Text className="MsoNormal">
            You may also have the option of sharing additional information with
            the Company through Your Third-Party Social Media Service's account.
            If You choose to provide such information and Personal Data, during
            registration or otherwise, You are giving the Company permission to
            use, share, and store it in a manner consistent with this Privacy
            Policy.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            Information Collected while Using the Application
          </Text>
          <Text className="MsoNormal">
            While using Our Application, in order to provide features of Our
            Application, We may collect, with Your prior permission:
          </Text>
          <Text className="MsoListBullet">
            Information regarding your location
          </Text>
          <Text className="MsoNormal">
            We use this information to provide features of Our Service, to
            improve and customize Our Service. The information may be uploaded
            to the Company's servers and/or a Service Provider's server or it
            may be simply stored on Your device.
          </Text>
          <Text className="MsoNormal">
            You can enable or disable access to this information at any time,
            through Your Device settings.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Use of Your Personal Data
          </Text>
          <Text className="MsoNormal">
            The Company may use Personal Data for the following purposes:
          </Text>
          <Text className="MsoListParagraphCxSpFirst">
            <Text style={{ fontWeight: 600 }}>
              To provide and maintain our Service
            </Text>
            , including to monitor the usage of our Service.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>To manage Your Account:</Text> to
            manage Your registration as a user of the Service. The Personal Data
            You provide can give You access to different functionalities of the
            Service that are available to You as a registered user.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>
              For the performance of a contract:
            </Text>
            the development, compliance and undertaking of the purchase contract
            for the products, items or services You have purchased or of any
            other contract with Us through the Service.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>To contact You:</Text> To contact
            You by email, telephone calls, SMS, or other equivalent forms of
            electronic communication, such as a mobile application's push
            notifications regarding updates or informative communications
            related to the functionalities, products or contracted services,
            including the security updates, when necessary or reasonable for
            their implementation.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>To provide You</Text> with news,
            special offers and general information about other goods, services
            and events which we offer that are similar to those that you have
            already purchased or enquired about unless You have opted not to
            receive such information.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>To manage Your requests:</Text> To
            attend and manage Your requests to Us.
          </Text>
          <Text className="MsoListParagraphCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>For business transfers:</Text> We
            may use Your information to evaluate or conduct a merger,
            Viewestiture, restructuring, reorganization, dissolution, or other
            sale or transfer of some or all of Our assets, whether as a going
            concern or as part of bankruptcy, liquidation, or similar
            proceeding, in which Personal Data held by Us about our Service
            users is among the assets transferred.
          </Text>
          <Text className="MsoListParagraphCxSpLast">
            <Text style={{ fontWeight: 600 }}>For other purposes</Text>: We may
            use Your information for other purposes, such as data analysis,
            identifying usage trends, determining the effectiveness of our
            promotional campaigns and to evaluate and improve our Service,
            products, services, marketing and your experience.
          </Text>
          <Text className="MsoNormal">
            We may share Your personal information in the following situations:
          </Text>
          <Text className="MsoListBulletCxSpFirst">
            <Text style={{ fontWeight: 600 }}>With Service Providers:</Text> We
            may share Your personal information with Service Providers to
            monitor and analyze the use of our Service, to contact You.
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>For business transfers:</Text> We
            may share or transfer Your personal information in connection with,
            or during negotiations of, any merger, sale of Company assets,
            financing, or acquisition of all or a portion of Our business to
            another company.
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>With Affiliates:</Text> We may
            share Your information with Our affiliates, in which case we will
            require those affiliates to honor this Privacy Policy. Affiliates
            include Our parent company and any other subsidiaries, joint venture
            partners or other companies that We control or that are under common
            control with Us.
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>With business partners:</Text> We
            may share Your information with Our business partners to offer You
            certain products, services or promotions.
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            <Text style={{ fontWeight: 600 }}>With other users:</Text> when You
            share personal information or otherwise interact in the public areas
            with other users, such information may be viewed by all users and
            may be publicly distributed outside. If You interact with other
            users or register through a Third-Party Social Media Service, Your
            contacts on the Third-Party Social Media Service may see Your name,
            profile, pictures and description of Your activity. Similarly, other
            users will be able to view descriptions of Your activity,
            communicate with You and view Your profile.
          </Text>
          <Text className="MsoListBulletCxSpLast">
            <Text style={{ fontWeight: 600 }}>With Your consent</Text>: We may
            disclose Your personal information for any other purpose with Your
            consent.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Retention of Your Personal Data
          </Text>
          <Text className="MsoNormal">
            The Company will retain Your Personal Data only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use Your Personal Data to the extent necessary to comply
            with our legal obligations (for example, if we are required to
            retain your data to comply with applicable laws), resolve disputes,
            and enforce our legal agreements and policies.
          </Text>
          <Text className="MsoNormal">
            The Company will also retain Usage Data for internal analysis
            purposes. Usage Data is generally retained for a shorter period of
            time, except when this data is used to strengthen the security or to
            improve the functionality of Our Service, or We are legally
            obligated to retain this data for longer time periods.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Transfer of Your Personal Data
          </Text>
          <Text className="MsoNormal">
            Your information, including Personal Data, is processed at the
            Company's operating offices and in any other places where the
            parties involved in the processing are located. It means that this
            information may be transferred to — and maintained on — computers
            located outside of Your state, province, country or other
            governmental jurisdiction where the data protection laws may differ
            than those from Your jurisdiction.
          </Text>
          <Text className="MsoNormal">
            Your consent to this Privacy Policy followed by Your submission of
            such information represents Your agreement to that transfer.
          </Text>
          <Text className="MsoNormal">
            The Company will take all steps reasonably necessary to ensure that
            Your data is treated securely and in accordance with this Privacy
            Policy and no transfer of Your Personal Data will take place to an
            organization or a country unless there are adequate controls in
            place including the security of Your data and other personal
            information.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Delete Your Personal Data
          </Text>
          <Text className="MsoNormal">
            You have the right to delete or request that We assist in deleting
            the Personal Data that We have collected about You.
          </Text>
          <Text className="MsoNormal">
            Our Service may give You the ability to delete certain information
            about You from within the Service.
          </Text>
          <Text className="MsoNormal">
            You may update, amend, or delete Your information at any time by
            signing in to Your Account, if you have one, and visiting the
            account settings section that allows you to manage Your personal
            information. You may also contact Us to request access to, correct,
            or delete any personal information that You have provided to Us.
          </Text>
          <Text className="MsoNormal">
            Please note, however, that We may need to retain certain information
            when we have a legal obligation or lawful basis to do so.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Disclosure of Your Personal Data
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            Business Transactions
          </Text>
          <Text className="MsoNormal">
            If the Company is involved in a merger, acquisition or asset sale,
            Your Personal Data may be transferred. We will provide notice before
            Your Personal Data is transferred and becomes subject to a different
            Privacy Policy.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>Law enforcement</Text>
          <Text className="MsoNormal">
            Under certain circumstances, the Company may be required to disclose
            Your Personal Data if required to do so by law or in response to
            valid requests by public authorities (e.g. a court or a government
            agency).
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            Other legal requirements
          </Text>
          <Text className="MsoNormal">
            The Company may disclose Your Personal Data in the good faith belief
            that such action is necessary to:
          </Text>
          <Text className="MsoListBulletCxSpFirst">
            Comply with a legal obligation
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            Protect and defend the rights or property of the Company
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            Prevent or investigate possible wrongdoing in connection with the
            Service
          </Text>
          <Text className="MsoListBulletCxSpMiddle">
            Protect the personal safety of Users of the Service or the public
          </Text>
          <Text className="MsoListBulletCxSpLast">
            Protect against legal liability
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Security of Your Personal Data
          </Text>
          <Text className="MsoNormal">
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Children's Privacy
          </Text>
          <Text className="MsoNormal">
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13. If You are a parent or guardian and You are
            aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data
            from anyone under the age of 13 without verification of parental
            consent, We take steps to remove that information from Our servers.
          </Text>
          <Text className="MsoNormal">
            If We need to rely on consent as a legal basis for processing Your
            information and Your country requires consent from a parent, We may
            require Your parent's consent before We collect and use that
            information.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Links to Other Websites
          </Text>
          <Text className="MsoNormal">
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party's site. We strongly advise You to
            review the Privacy Policy of every site You visit.
          </Text>
          <Text className="MsoNormal">
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Changes to this Privacy Policy
          </Text>
          <Text className="MsoNormal">
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </Text>
          <Text className="MsoNormal">
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the "Last
            updated" date at the top of this Privacy Policy.
          </Text>
          <Text className="MsoNormal">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>Contact Us</Text>
          <Text className="MsoNormal">
            If you have any questions about this Privacy Policy, You can contact
            us:
          </Text>
          <Text className="MsoListBullet">By email: info@shipsar.in</Text>
        </View>
      </View>
    </ScrollView>
  );
}
