import { Dimensions, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Button, Input, Spinner, Text } from "@ui-kitten/components";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import { firebaseAuth } from "../../../Infrastructure/firebase.config";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import LogOut from "../../../Services/LogOut";
import { resetOrders } from "../../../redux/Slices/OrdersSlice";
import { resetProducts } from "../../../redux/actions/allProducts";
import { resetCategories } from "../../../redux/actions/allCategories";

export default function LoginScreen({ navigation }) {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    other: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();

  const tdf =
    process.env.EXPO_PUBLIC_u2 +
    "" +
    process.env.EXPO_PUBLIC_u9 +
    "" +
    process.env.EXPO_PUBLIC_u1 +
    "" +
    process.env.EXPO_PUBLIC_u0;

  const tdf2 =
    process.env.EXPO_PUBLIC_u21 +
    "" +
    process.env.EXPO_PUBLIC_u91 +
    "" +
    process.env.EXPO_PUBLIC_u11 +
    "" +
    process.env.EXPO_PUBLIC_u01;

  const signInUser = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        async ({ user }) => {
          console.log(user);
          if (!user?.emailVerified) {
            // await signOut(firebaseAuth);
            await dispatch(resetOrders());
            await dispatch(resetProducts());
            await dispatch(resetCategories());
            await LogOut({ navigation });
            setError({ other: "Access Denied!" });
          } else {
            if (user.uid == tdf || user.uid == tdf2) {
              console.log("USER UID => ", user.uid);
              navigation.replace("BottomTab");
            } else {
              await dispatch(resetOrders());
              await dispatch(resetProducts());
              await dispatch(resetCategories());
              await LogOut({ navigation });
              setError({ other: "Access Denied!" });
            }
          }
          setIsLoading(false);
        }
      );
    } catch (error) {
      if (error.toString().includes("invalid-credential")) {
        setError({ other: "Password is Invalid!" });
      } else {
        setError({ other: JSON.stringify(error) });
      }
      console.error("SignIn => ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            if (user?.emailVerified) {
              if (user?.uid == tdf || user.uid == tdf2) {
                // console.log("user.uid => ", user.uid);
                await SplashScreen.hideAsync();
                navigation.replace("BottomTab");
              } else {
                await dispatch(resetOrders());
                await dispatch(resetProducts());
                await dispatch(resetCategories());
                await LogOut({ navigation });
                await SplashScreen.hideAsync();
                console.log("Invalid Attempt log out user! , 1");
              }
            } else {
              await dispatch(resetOrders());
              await dispatch(resetProducts());
              await dispatch(resetCategories());
              console.log("Invalid Attempt log out user! , 2");
              await LogOut({ navigation });
              await SplashScreen.hideAsync();
            }
          } else {
            await SplashScreen.hideAsync();
          }
        });
      } catch (error) {
        await SplashScreen.hideAsync();
        console.log(error);
      }
    })();
  }, [firebaseAuth]);

  const validation = () => {
    const error = {};

    if (!emailID) {
      error.email = "Email Id required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailID)) error.email = "Invalid email ID!";
    }

    if (!password) error.password = "Password is required!";
    else if (password.length < 6) error.password = "Invalid Password!";

    if (error.email || error.password) {
      setError(error);
      return false;
    } else return true;
  };

  const signIn = () => {
    if (validation()) signInUser({ email: emailID, password });
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: GlobalColors.primary,
          flex: 1,
          height: Dimensions.get("screen").height,
          padding: 10,
          paddingTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Hey, eMVee Admin
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Log In to your account
        </Text>
        <View
          style={{
            marginVertical: 20,
            gap: 20,
          }}
        >
          {error?.other && (
            <Text
              status="danger"
              style={{
                fontWeight: 700,
              }}
            >
              {error?.other}
            </Text>
          )}
          <Input
            value={emailID}
            label="Email ID"
            placeholder="enter your email ID"
            accessoryLeft={() => (
              <Entypo name="email" size={24} color="black" />
            )}
            status={error?.email ? "danger" : "basic"}
            caption={
              error?.email &&
              (() => (
                <Text
                  status="danger"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginTop: 5,
                  }}
                >
                  {error?.email}
                </Text>
              ))
            }
            onChangeText={(nextValue) => setEmailID(nextValue)}
            size="large"
            style={{
              elevation: 5,
            }}
          />
          <Input
            value={password}
            label="Password"
            placeholder="enter your password"
            // caption={renderCaption}
            accessoryRight={() => (
              <Ionicons
                name={secureTextEntry ? "eye-off" : "eye"}
                size={24}
                color="black"
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            )}
            status={error?.password ? "danger" : "basic"}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
            size="large"
            style={{
              elevation: 5,
            }}
            caption={
              error?.password &&
              (() => (
                <Text
                  status="danger"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginTop: 5,
                  }}
                >
                  {error?.password}
                </Text>
              ))
            }
          />

          {isLoading ? (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Spinner status="danger" />
            </View>
          ) : (
            <Button
              status="danger"
              style={{
                elevation: 2,
              }}
              onPress={() => signIn()}
            >
              Login
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
