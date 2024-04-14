import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../../Infrastructure/firebase.config";
import OrderTime from "../../../Services/Offline/OrderTime";

export const cancelOrderFunction = async ({
  OrderID,
  setCancelLoading,
  setIsCancelled,
  dispatch,
  cancelOrder,
}) => {
  setCancelLoading(true);
  try {
    const docRef = await doc(firestoreDB, "or4", OrderID);
    await updateDoc(docRef, {
      "s.c": -1,
      "-1": new Timestamp.now(),
    });

    setIsCancelled(true);

    dispatch(cancelOrder(OrderID));
  } catch (error) {
    console.log(error);
    setCancelLoading(false);
  }
  setCancelLoading(false);
};

export const confirmOrder = async ({
  selectedIndex,
  OrderID,
  status,
  setStatusLoading,
  setIsDelivered,
  dispatch,
  deliverOrderReducer,
}) => {
  setStatusLoading(true);
  try {
    let delieveryTimeLine = null;

    if (selectedIndex) {
      delieveryTimeLine = new Timestamp.now();
      delieveryTimeLine.seconds += 60 * OrderTime[selectedIndex?.row]?.title;
    }

    const docRef = await doc(firestoreDB, "or4", OrderID);
    if (status == 1)
      await updateDoc(docRef, {
        "s.c": status,
        [`s.1`]: new Timestamp.now(),
        "s.t": delieveryTimeLine,
      });

    if (status == 2)
      await updateDoc(docRef, {
        "s.c": status,
        [`s.2`]: new Timestamp.now(),
      });

    if (status == 3) {
      await updateDoc(docRef, {
        "s.c": 3,
        "s.3": new Timestamp.now(),
      });
      setIsDelivered(true);
      dispatch(deliverOrderReducer(OrderID));
    }
  } catch (error) {
    console.log("DELIVERY ERROR ", error);
  }
  setStatusLoading(false);
};
