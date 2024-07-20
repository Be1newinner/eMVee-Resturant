import { Dimensions, Image, Text, View } from "react-native";
import { ScrollView } from "react-native";
import TopView from "../../../../Components/TopView";
import { GlobalColors } from "../../../../Infrastructure/GlobalVariables";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../../../../Infrastructure/firebase.config";
import { Button, Spinner } from "@ui-kitten/components";

export default function VerifyEmail({ navigation, route }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginAgain = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async ({ user }) => {
        console.log("Sign IN =>", user?.emailVerified);
        if (user?.emailVerified) {
          navigation.replace("BottomTab");
        } else {
          await signOut(firebaseAuth);
          setError("Still not Verified!");
        }
      })
      .catch((error) => {
        setError("Still not Verified!");
        console.error("SignIn => ", error);
      });
    setIsLoading(false);
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
          navigation={navigation}
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
              fontWeight: 600,
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
            source={require("../../../../../assets/images/email.webp")}
            style={{
              width: Dimensions.get("screen").width - 50,
              objectFit: "contain",
              height: ((Dimensions.get("screen").width - 50) * 9) / 10,
            }}
          />
          <Text
            style={{
              fontWeight: 600,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {route.params.email}
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
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {error}
              </Text>
            )}
            <Text>have you verified?</Text>

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
                  onPress={() =>
                    loginAgain({
                      email: route.params.email,
                      password: route.params.password,
                    })
                  }
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
