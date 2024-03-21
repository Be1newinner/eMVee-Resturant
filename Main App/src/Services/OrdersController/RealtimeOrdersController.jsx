import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  firebaseAuth,
  firestoreDB,
} from "../../Infrastructure/firebase.config";

export default function RealtimeOrdersController() {
  useEffect(() => {
    (async function () {
      const Orders = {};

      const q = await query(
        collection(firestoreDB, "or4"),
        where("ui", "==", firebaseAuth.currentUser.uid)
      );
      const q1 = await query(
        collection(firestoreDB, "or5"),
        where("u", "==", firebaseAuth.currentUser.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          Orders[doc.id] = {
            ...doc.data(),
            id: doc.id,
          };
        });
        console.log("Current orders: ", Orders, "\n\n");
      });
      onSnapshot(q1, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          Orders[doc.id] = {
            ...Orders[doc.id],
            status: { ...doc.data() },
          };
        });
        console.log("Current orders: ", Orders);
      });
    })();
  }, []);

  return <></>;
}
