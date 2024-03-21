import { Pressable, ScrollView, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProfileTopView from "../../../Components/ProfileTopView";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";

export default function SettingScreen({ navigation }) {
  const MenuItems = [
    {
      title: "Your Profile",
      action: "EditProfile",
      key: 0,
      icon: "user",
    },
    {
      title: "Saved Addresses",
      action: "AddAddressScreen",
      key: 1,
      icon: "enviromento",
    },
    {
      title: "About Us",
      action: "AboutUs",
      key: 2,
      icon: "info",
    },
    {
      title: "Terms & Conditions",
      action: "TermsCondition",
      key: 3,
      icon: "",
    },
    {
      title: "Privacy Policy",
      action: "PrivacyPolicy",
      key: 4,
      icon: "",
    },
    {
      title: "Log Out",
      action: "SignIn",
      key: 5,
      icon: "",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <ProfileTopView />

        <View
          style={{
            gap: 10,
            paddingBottom: 40,
          }}
        >
          {MenuItems?.map((item) => (
            <Pressable
              style={{
                backgroundColor: "#fff",
                padding: 20,
                marginHorizontal: 10,
                borderRadius: 20,
                elevation: 5,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              key={item.key}
              onPress={() => item.action && navigation.navigate(item.action)}
            >
              {item.icon ? (
                <AntDesign
                  name={item.icon}
                  size={24}
                  color="rgba(100,100,105,1)"
                />
              ) : null}
              <Text
                style={{
                  fontSize: 16,
                  color: "rgba(100,100,105,1)",
                  flex: 1,
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={24}
                color="rgba(100,100,105,1)"
              />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
