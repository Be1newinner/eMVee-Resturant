import { Pressable, ScrollView, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProfileTopView from "../../../Components/ProfileTopView";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Services/Slices/AuthSlice";
import { resetCart } from "../../../Services/Slices/CartSlice";
import { resetAddress } from "../../../Services/Slices/AddressSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../../../Infrastructure/firebase.config";
import { resetOrders } from "../../../Services/Slices/OrdersSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const AuthSelector = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();

  const [authState, setAuthState] = useState(null);
  const [userState, setUserState] = useState(null);
  const [IsLoggingLoader, setIsLoggingLoader] = useState(false);

  useEffect(() => {
    try {
      const auth = AuthSelector.auth;
      // console.log("a", AuthSelector);
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

  // useEffect(() => {
  //   console.log("authState", authState?.phone_no);
  // }, [authState]);

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
      title:
        authState?.phone_no?.length == 10
          ? IsLoggingLoader
            ? "Logging Out..."
            : "Log Out"
          : "Log In",
      action: authState?.phone_no?.length == 10 ? null : "LoginWithPhone",
      key: 6,
      icon: "",
      action2: async () => {
        setIsLoggingLoader(true);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("auth");
        await removeUserToken(authState?.phone_no);
        dispatch(logout());
        dispatch(resetCart());
        dispatch(resetAddress());
        dispatch(resetOrders());
        // await AsyncStorage.removeItem("address");
        // console.log("log Out Function");
        setIsLoggingLoader(false);
      },
    },
  ];

  const removeUserToken = async (phone) => {
    try {
      if (!phone) return;
      await set(ref(realtimeDB, `tokens/${phone}`), null);
    } catch (error) {
      console.log("Unexpected error! ", error);
    }
  };

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
