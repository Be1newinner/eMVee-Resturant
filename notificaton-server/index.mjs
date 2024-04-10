import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBUy5dLmjmH3oH1Vi56nCKsheIF3_CffKs",
  authDomain: "emvee-resturant.firebaseapp.com",
  databaseURL: "https://emvee-resturant-default-rtdb.firebaseio.com",
  projectId: "emvee-resturant",
  storageBucket: "emvee-resturant.appspot.com",
  messagingSenderId: "287212895412",
  appId: "1:287212895412:web:f05aef950f6faf2e2f6be1",
};

const vapidKey =
  "BNefh1Peep07J3rj8JP-ahH0VmTosRz3E-FOA9708IwGw0NOx4mjJKA1ANB0YcoXlQ29Z4oy3iaphLffhqujgtE";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

getToken(messaging, { vapidKey })
  .then((currentToken) => {
    if (currentToken) {
      console.log("NEW TOKEN");
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      requestPermission();
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}
