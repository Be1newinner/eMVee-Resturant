import WebView from "react-native-webview";
import { decode } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../../../../Services/Slices/AuthSlice";
import GetAddressController from "../../../../Services/OrdersController/GetAddressController";
import { addAddressArray } from "../../../../Services/Slices/AddressSlice";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../../../../Infrastructure/firebase.config";

export default function LoginWithPhone({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = {
    iss: "phmail",
    aud: "user",
    country_code: "+91",
    phone_no: "7630985985",
  };
  const URI = `https://auth.phone.email/sign-in?countrycode=${userInfo.country_code}&phone_no=${userInfo.phone_no}&redirect_url=&mode=othernum&auth_type=4`;

  const phoneAuthJwt = async (event) => {
    const token = event.nativeEvent.data;
    const decodedJWT = decode(token.split(".")[1]);
    await LoginUser({ JWT: decodedJWT });
  };

  const addUserToken = async (data, phone) => {
    await set(ref(realtimeDB, `tokens/${phone}/${data}`), data);
  };

  const LoginUser = async ({ JWT }) => {
    // console.log("JWT", JWT);
    try {
      const auth = JSON.parse(JWT);
      if (auth?.phone_no?.length === 10) {
        await AsyncStorage.setItem("auth", JWT);
        const addresses = await GetAddressController({
          phone_no: auth?.phone_no,
        });
        const data = await AsyncStorage.getItem("FCM_Token");
        await addUserToken(data, auth?.phone_no);
        dispatch(addAddressArray(addresses));
        dispatch(login(JSON.stringify({ auth })));
        navigation.goBack();
      } else console.log("Phone Error");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WebView
      source={{ uri: URI }}
      style={{
        flex: 1,
      }}
      onMessage={phoneAuthJwt}
      ref={(webView) => {
        this.webView = webView;
      }}
    />
  );
}
