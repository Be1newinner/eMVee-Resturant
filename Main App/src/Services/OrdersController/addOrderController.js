import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { firestoreDB, addDoc } from "../../Infrastructure/firebase.config";

export default async function addOrderController({ order, uid, address }) {
  try {
    const docRef = await addDoc(collection(firestoreDB, "or4"), {
      ...order,
      u: uid,
      ad: address,
    });

    const orderID = await docRef.id;

    const docRef2 = await setDoc(doc(firestoreDB, "or5", orderID), {
      0: new Timestamp.now(),
    });

    console.log("Order ID", docRef2);
  } catch (error) {
    console.log("Adding Doc Error!");
  }
}
