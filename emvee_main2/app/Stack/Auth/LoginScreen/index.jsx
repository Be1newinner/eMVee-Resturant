import { Dimensions, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Button, Divider, Input, Spinner, Text } from "@ui-kitten/components";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { GlobalColors } from "../../../../infrasrtructure/GlobalVariables";
import Svg, { Path } from "react-native-svg";
import { firebaseAuth } from "../../../../infrasrtructure/firebase.config";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    other: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const signInUser = async ({ email, password }) => {
    setError({});
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      if (!user?.emailVerified) {
        await sendEmailVerification(user);
        await signOut(firebaseAuth);
        setIsLoading(false);
        router.push({
          pathname: "Stack/Auth/VerifyEmail",
          params: { email: emailID, password },
        });
      } else {
        router.replace("BottomTabs/HomeScreen");
      }
    } catch (error) {
      const errorMessage = error.message.includes("invalid-credential")
        ? "Password is Invalid!"
        : error.message;
      setError({ other: errorMessage });
      setIsLoading(false);
    }
  };

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
    }
    return true;
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
        <Text style={{ fontSize: 24, fontWeight: "700" }}>
          Log In to your account
        </Text>
        <View style={{ marginVertical: 20, gap: 20 }}>
          {error?.other && (
            <Text status="danger" style={{ fontWeight: "700" }}>
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
              error?.email && (
                <Text
                  status="danger"
                  style={{ fontSize: 13, fontWeight: "700", marginTop: 5 }}
                >
                  {error?.email}
                </Text>
              )
            }
            onChangeText={setEmailID}
            size="large"
            style={{ elevation: 5 }}
          />
          <Input
            value={password}
            label="Password"
            placeholder="enter your password"
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
            onChangeText={setPassword}
            size="large"
            style={{ elevation: 5 }}
            caption={
              error?.password && (
                <Text
                  status="danger"
                  style={{ fontSize: 13, fontWeight: "700", marginTop: 5 }}
                >
                  {error?.password}
                </Text>
              )
            }
          />
          {isLoading ? (
            <View style={{ alignItems: "center" }}>
              <Spinner status="danger" />
            </View>
          ) : (
            <Button status="danger" style={{ elevation: 2 }} onPress={signIn}>
              Login
            </Button>
          )}
          <Text style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Text status="primary" onPress={() => router.replace("Stack/Auth/RegisterScreen")}>
              Sign Up
            </Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Divider style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.15)" }} />
          <Text style={{ fontSize: 16 }}>or</Text>
          <Divider style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.15)" }} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderColor: "rgba(0,0,0,0.15)",
            borderWidth: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            padding: 10,
            borderRadius: 5,
            elevation: 1,
            marginTop: 20,
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <Path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <Path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <Path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <Path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </Svg>
          <Text style={{ fontWeight: "700", color: "rgba(0,0,0,0.6)" }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
