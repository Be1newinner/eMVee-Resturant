import { Pressable, ScrollView, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProfileTopView from "@/components/ProfileTopView";
import { GlobalColors } from "@/Infrastructure/GlobalVariables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Services/Slices/AuthSlice";
import { resetCart } from "@/Services/Slices/CartSlice";
import { resetAddress } from "@/Services/Slices/AddressSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const AuthSelector = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();

  const [authState, setAuthState] = useState(null);
  const [userState] = useState(null);

  useEffect(() => {
    try {
      const auth = AuthSelector.auth;
      setAuthState(auth);
    } catch (error) {
      console.log(error);
    }
  }, [AuthSelector.auth, AuthSelector.user]);

  const MenuItems = [
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
      title: authState?.phone_no?.length == 10 ? "Log Out" : "Log In",
      action: authState?.phone_no?.length == 10 ? null : "LoginWithPhone",
      key: 6,
      icon: "",
      action2: async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("auth");
        dispatch(logout());
        dispatch(resetCart());
        dispatch(resetAddress());
      },
    },
  ];

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: GlobalColors.primary,
        }}
      >
        <View>
          <ProfileTopView name={userState?.name} phone={authState?.phone_no} />

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
                onPress={() =>
                  item.action
                    ? navigation.navigate(item.action)
                    : item.action2()
                }
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
    </>
  );
}
