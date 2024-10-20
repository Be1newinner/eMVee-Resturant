import { Pressable, ScrollView, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProfileTopView from "../../../components/ProfileTopView";
import { GlobalColors } from "../../../infrasrtructure/GlobalVariables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/Slices/AuthSlice";
import { resetCart } from "../../../services/Slices/CartSlice";
import { resetAddress } from "../../../services/Slices/AddressSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../../../infrasrtructure/firebase.config";
import { resetOrders } from "../../../services/Slices/OrdersSlice";
import { useRouter } from "expo-router"; 

export default function SettingScreen() {
  const router = useRouter(); 
  const AuthSelector = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();

  const [authState, setAuthState] = useState(null);
  const [userState, setUserState] = useState(null);
  const [isLoggingLoader, setIsLoggingLoader] = useState(false);

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
      action: "Stack/AddAddressScreen",
      key: 1,
      icon: "enviromento",
    },
    {
      title: "About Us",
      action: "Stack/AboutUs",
      key: 2,
      icon: "info",
    },
    {
      title: "Terms & Conditions",
      action: "Stack/TermsCondition",
      key: 3,
      icon: "",
    },
    {
      title: "Privacy Policy",
      action: "Stack/PrivacyPolicy",
      key: 4,
      icon: "",
    },
    // {
    //   title:
    //     authState?.phone_no?.length === 10
    //       ? isLoggingLoader
    //         ? "Logging Out..."
    //         : "Log Out"
    //       : "Log In",
    //   action: authState?.phone_no?.length === 10 ? null : "LoginWithPhone",
    //   key: 6,
    //   icon: "",
    //   action2: async () => {
    //     setIsLoggingLoader(true);
    //     await AsyncStorage.removeItem("user");
    //     await AsyncStorage.removeItem("auth");
    //     await removeUserToken(authState?.phone_no);
    //     dispatch(logout());
    //     dispatch(resetCart());
    //     dispatch(resetAddress());
    //     dispatch(resetOrders());
    //     setIsLoggingLoader(false);
    //   },
    // },
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
                item.actionnavigation
                  ? router.push(item.action) 
                  : ""
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
                  fontWeight: "500",
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
