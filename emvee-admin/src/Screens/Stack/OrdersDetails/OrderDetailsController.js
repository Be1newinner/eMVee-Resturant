import { Timestamp, doc, updateDoc } from "firebase/firestore";
import {
  firestoreDB,
  realtimeDB,
} from "../../../Infrastructure/firebase.config";
import OrderTime from "../../../Services/Offline/OrderTime";
import { ref, child, get } from "firebase/database";
import { NotificationByOrders } from "../../../Services/Offline/NotificationByOrders";

const getUserTokens = async ({ user }) => {
  if (!user) return null;
  try {
    const dbRef = await ref(realtimeDB);
    const data = await get(child(dbRef, `tokens/${user}`));
    if (data.exists()) return data.val() || {};
    return {};
  } catch (error) {
    return {};
  }
};

const sendNotificationToUser = async ({
  token,
  status,
  time = 0,
  CancelReason,
}) => {
  if (!token || !status) return null;
  try {
    await fetch('https://e-m-vee-resturant.vercel.app/api/send-pn', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        title: NotificationByOrders({ time, status })?.title,
        message:
          status < 0
            ? "Reason: " + CancelReason
            : NotificationByOrders({ time, status })?.body,
        scopeKey: "@be1newinner/emvee-admin",
        experienceId: "@be1newinner/emvee-admin",
        channelId: "default",
      }),
    });


  } catch (error) {
    console.log("UNABLE TO SEND NOTIFICATION TO ADMIN => ", error);
  }
};

export const cancelOrderFunction = async ({
  OrderID,
  setCancelLoading,
  setIsCancelled,
  dispatch,
  cancelOrder,
  phoneNumber,
  orderCancelStatus,
  CancelReason,
}) => {
  setCancelLoading(true);
  try {
    const docRef = await doc(firestoreDB, "or4", OrderID);
    await updateDoc(docRef, {
      "s.c": orderCancelStatus,
      [orderCancelStatus]: new Timestamp.now(),
      "s.r": CancelReason,
    });

    const data = await getUserTokens({ user: phoneNumber });
    const UserTokens = Object.values(data);
    console.log("User Tokens =>", UserTokens);
    UserTokens?.forEach((e) => {
      sendNotificationToUser({
        token: e,
        status: orderCancelStatus,
        CancelReason,
      });
    });

    setIsCancelled(true);
    dispatch(cancelOrder(OrderID));
  } catch (error) {
    console.log("The Error => ", error);
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
  phoneNumber,
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

    const data = await getUserTokens({ user: phoneNumber });
    const UserTokens = Object.values(data);
    console.log("User Tokens =>", UserTokens);
    UserTokens?.forEach((e) => {
      sendNotificationToUser({
        token: e,
        status,
        time: OrderTime[selectedIndex?.row]?.title,
      });
    });
  } catch (error) {
    console.log("DELIVERY ERROR ", error);
  }
  setStatusLoading(false);
};
