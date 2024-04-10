var admin = require("firebase-admin");

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shipsar-main-default-rtdb.firebaseio.com/",
});

async function isPhoneNumberTaken(phoneNumber) {
  try {
    const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
    return userRecord !== null;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return false;
    } else {
      throw error;
    }
  }
}

// signUpWithPhoneNumber({ phoneNumber })
//   .then((user) => {
//     console.log("User signed up:", user);
//   })
//   .catch((error) => {
//     console.error("Error signing up:", error.message);
//   });
