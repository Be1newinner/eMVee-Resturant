import { Pressable, ScrollView, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProfileTopView from "../../../Components/ProfileTopView";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Services/Slices/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const AuthSelector = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();

  const [authState, setAuthState] = useState(null);
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    try {
      const auth = AuthSelector.auth;
      console.log("a", AuthSelector);
      // const user = AuthSelector.user;
      // console.log(auth);
      setAuthState(auth);
      // setUserState(user);
      // AsyncStorage.removeItem("user");
      // AsyncStorage.removeItem("auth");
    } catch (error) {
      console.log(error);
    }
  }, [AuthSelector.auth, AuthSelector.user]);

  useEffect(() => {
    console.log("authState", authState?.phone_no);
  }, [authState]);

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
    // {
    //   title: authState?.phone_no?.length == 10 ? "Log Out" : "Log In",
    //   action: authState?.phone_no?.length == 10 ? null : "LoginWithPhone",
    //   key: 6,
    //   icon: "",
    //   action2: async () => {
    //     dispatch(logout());
    //     console.log("log Out Function");
    //   },
    // },
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
