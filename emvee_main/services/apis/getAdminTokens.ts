import { realtimeDB } from "@/infrastructure/firebase.config";
import { ref, child, get } from "firebase/database";

export const getAdminTokens = async () => {
  try {
    let data;
    const dbRef = await ref(realtimeDB);
    await get(child(dbRef, `token`)).then((snapshot) => {
      snapshot.exists() && (data = snapshot.val());
    });
    return data;
  } catch (error) {
    console.log("Getting ADMIN TOKEN ERROR => ", error);
    return null;
  }
};
