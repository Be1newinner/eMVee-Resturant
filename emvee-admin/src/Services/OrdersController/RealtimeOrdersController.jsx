import { useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  or,
} from "firebase/firestore";
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
      const q1 = await query(
        collection(firestoreDB, "or4"),
        or(where("s.c", "==", 0), where("s.c", "==", 1))
      );
      onSnapshot(q1, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(
            addOrder(
              JSON.stringify({
                key: doc.id,
                value: doc.data(),
              })
            )
          );
          console.log("Processing => ", doc.id);
        });
      });
    })();
  }, []);

  return <></>;
}
