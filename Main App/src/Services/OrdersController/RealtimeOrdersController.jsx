import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../Infrastructure/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../Slices/OrdersSlice";

export default function RealtimeOrdersController() {
  const dispatch = useDispatch();
  const AuthSelector = useSelector((state) => state.Authentication);

  useEffect(() => {
    (async function () {
      if (AuthSelector?.auth?.phone_no?.length == 10) {
        console.log("phone in orders", AuthSelector?.auth?.phone_no);
        const q = await query(
          collection(firestoreDB, "or4"),
          where("u.u", "==", AuthSelector?.auth?.phone_no)
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
      } else {
        console.log("no phone in orders", AuthSelector?.auth?.phone_no);
      }
    })();
  }, [AuthSelector]);

  return null;
}
