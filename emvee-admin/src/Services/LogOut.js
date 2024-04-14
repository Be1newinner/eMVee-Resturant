import { ref, set } from "firebase/database";
import { firebaseAuth, realtimeDB } from "./../Infrastructure/firebase.config";
import { signOut } from "firebase/auth";

export default async function LogOut({ AsyncStorage, navigation }) {
  try {
    if (typeof AsyncStorage != "undefined") {
      const data = await AsyncStorage.getItem("FCM_Token");
      if (data !== null) {
        await set(ref(realtimeDB, `token/${data}`), null);
      }
    }
  } catch (e) {
    console.error(e);
  }
  await signOut(firebaseAuth);
  if (navigation) navigation.replace("LoginScreen");
}
