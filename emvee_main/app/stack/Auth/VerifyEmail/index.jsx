import { ScrollView, Dimensions, Image, Text, View } from "react-native";
import { useState } from "react";
import { Button, Spinner } from "@ui-kitten/components";
import { useRouter, useSearchParams } from "expo-router";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import TopView from "@/components/TopView";
import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import { firebaseAuth } from "@/infrasrtructure/firebase.config";
import { PAGES_TAB } from "../../../../constants/Pages";

export default function VerifyEmail() {
  const router = useRouter();
  const { email, password } = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginAgain = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("Sign IN =>", user?.emailVerified);
      if (user?.emailVerified) {
        router.replace(PAGES_TAB.HOME_SCREEN);
      } else {
        await signOut(firebaseAuth);
        setError("Still not Verified!");
      }
    } catch (error) {
      setError("Still not Verified!");
      console.error("SignIn => ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: GlobalColors.primary,
          flex: 1,
          height: Dimensions.get("screen").height,
          padding: 10,
        }}
      >
        <TopView
          title=""
          position="relative"
          color="#000"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Verify your Email ID.
          </Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
            }}
          >
            A verification email is sent to your email.
          </Text>

          <Image
            source={require("../../../../assets/images/email.webp")}
            style={{
              width: Dimensions.get("screen").width - 50,
              objectFit: "contain",
              height: ((Dimensions.get("screen").width - 50) * 9) / 10,
            }}
          />
          <Text
            style={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {email}
          </Text>

          <View
            style={{
              alignItems: "center",
            }}
          >
            {error && (
              <Text
                style={{
                  color: "red",
                  fontWeight: "700",
                  fontSize: 15,
                }}
              >
                {error}
              </Text>
            )}
            <Text>Have you verified?</Text>

            <View
              style={{
                marginTop: 10,
              }}
            >
              {isLoading ? (
                <Spinner status="danger" />
              ) : (
                <Button
                  status="danger"
                  size="small"
                  onPress={loginAgain}
                >
                  Check again!
                </Button>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
