import { Timestamp, collection, doc, setDoc, addDoc } from "firebase/firestore";
import {
  firestoreDB,
  firebaseAuth,
} from "../../Infrastructure/firebase.config";

export default async function addOrderController({
  AddressSelector,
  CartSelector,
}) {
  try {
    const CurrentAddress = AddressSelector.addresses.filter(
      (e) => e.k == AddressSelector.default
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
      i: CartSelector.items,
      u: {
        u: firebaseAuth.currentUser.uid,
        n: CurrentAddress.n,
        p: CurrentAddress.p,
        a: CurrentAddress.h + ", " + CurrentAddress.l,
      },
    };

    const docRef = await addDoc(collection(firestoreDB, "or4"), OrderToSend);

    const orderID = await docRef.id;

    const docRef2 = await setDoc(doc(firestoreDB, "or5", orderID), {
      0: new Timestamp.now(),
    });

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
    console.log("Creating order Error!");
    return {
      status: 501,
      error: "Unknown Error!",
    };
  }
}
