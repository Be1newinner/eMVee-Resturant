import { Pressable, ScrollView, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import ProfileTopView from "@/components/ProfileTopView";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import { logout } from "@/services/Slices/AuthSlice";
import { resetCart } from "@/services/Slices/CartSlice";
import { resetAddress } from "@/services/Slices/AddressSlice";
import { PAGES_STACK } from "../../../constants/Pages";


export default function SettingScreen() {
  const AuthSelector = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();
  const router = useRouter();

  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    try {
      const auth = AuthSelector.auth;
      setAuthState(auth);
    } catch (error) {
      console.log(error);
    }
  }, [AuthSelector.auth]);

  const MenuItems = [
    {
      title: "Saved Addresses",
      action: PAGES_STACK.ADD_ADDRESS_SCREEN,
      key: 1,
      icon: "enviromento",
    },
    {
      title: "About Us",
      action: PAGES_STACK.ABOUT_US,
      key: 2,
      icon: "info",
    },
    {
      title: "Terms & Conditions",
      action: PAGES_STACK.TERMS_CONDITION,
      key: 3,
      icon: "",
    },
    {
      title: "Privacy Policy",
      action: PAGES_STACK.PRIVACY_POLICY,
      key: 4,
      icon: "",
    },
    {
      title: authState?.phone_no?.length === 10 ? "Log Out" : "Log In",
      action: PAGES_STACK.LOGIN_WITH_PHONE,
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <ProfileTopView phone={authState?.phone_no} />

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
              onPress={async () => {
                if (item.key == 6) {
                  if (authState?.phone_no?.length === 10) {
                    await item.action2()
                  } else {
                    router.navigate(item.action)
                  }
                } else {
                  router.navigate(item.action)
                }
              }}
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
