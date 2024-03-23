import { Timestamp, collection, addDoc } from "firebase/firestore";
import {
  firestoreDB,
  firebaseAuth,
} from "../../Infrastructure/firebase.config";

export default async function addOrderController({
  AddressSelector,
  CartSelector,
}) {
  try {
    const CurrentAddress = AddressSelector?.addresses?.filter(
      (e) => e.k == AddressSelector?.default
    )[0];

    const OrderToSend = {
      p: {
        c: CartSelector?.delivery,
        d: CartSelector?.discount,
        q: CartSelector?.qty,
        s: CartSelector?.subtotal,
        t: CartSelector?.total,
        x: CartSelector?.tax,
      },
      i: CartSelector?.items,
      u: {
        u: firebaseAuth.currentUser.uid,
        n: CurrentAddress?.n,
        p: CurrentAddress?.p,
        a: CurrentAddress?.h + ", " + CurrentAddress?.l,
      },
      s: {
        0: new Timestamp.now(),
        c: 0,
      },
    };

    const docRef = await addDoc(collection(firestoreDB, "or4"), OrderToSend);

    const orderID = await docRef.id;

    if (orderID) {
      return {
        status: 200,
        orderID,
      };
    } else {
      return {
        status: 501,
        error: "Unknown Error!",
      };
    }
  } catch (error) {
    console.log("Creating order Error!", error);
    return {
      status: 501,
      error: "Unknown Error!",
    };
  }
}
