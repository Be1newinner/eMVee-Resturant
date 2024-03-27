import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  firebaseAuth,
  firestoreDB,
} from "../../Infrastructure/firebase.config";
import { useDispatch } from "react-redux";
import { addOrder } from "../Slices/OrdersSlice";

export default function RealtimeOrdersController() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const q = await query(
        collection(firestoreDB, "or4"),
        where("u.u", "==", user.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(
            addOrder(
              JSON.stringify({
                key: doc.id,
                value: doc.data(),
              })
            )
          );
        });
      });
    })();
  }, [firebaseAuth]);

  return null;
}
