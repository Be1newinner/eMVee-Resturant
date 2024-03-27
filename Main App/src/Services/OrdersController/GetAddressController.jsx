import { getDocs, query, collection, where, limit } from "firebase/firestore";
import { firestoreDB } from "../../Infrastructure/firebase.config";

export default async function GetAddressController({ phone_no }) {
  try {
    if (phone_no.length == 10) {
      const products = [];
      const data = await getDocs(
        query(
          collection(firestoreDB, "ur57"),
          where("u", "==", phone_no),
          limit(5)
        )
      );

      data.forEach((item) => {
        products.push({
          ...item.data(),
          k: item.id,
        });
      });

      return products;
    } else {
      console.log("NEED 10 DIGIT MOBILE NUMBER");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
