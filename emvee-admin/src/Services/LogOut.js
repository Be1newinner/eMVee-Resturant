import { firebaseAuth } from "./../Infrastructure/firebase.config";
import { signOut } from "firebase/auth";

export default async function LogOut() {
  await signOut(firebaseAuth);
}
