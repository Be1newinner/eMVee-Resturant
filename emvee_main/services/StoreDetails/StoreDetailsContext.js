import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { firestoreDB } from "../../infrastructure/firebase.config";

export const StoreDetailsContext = createContext();

export const StoreDetailsProvider = ({ children }) => {
  const [StoreStatus, setStoreStatus] = useState(true);
  const [passedDate, setpassedDate] = useState(null);
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(firestoreDB, "ot", "s"), (doc) => {
      const data = doc.data();
      if (data?.t) {
        // console.log("THE DATE in Context", data?.t);
        setpassedDate(
          new Timestamp(data.t.seconds, data.t.nanoseconds).toDate()
        );
      }
    });
  }, []);

  useEffect(() => {
    // console.log("Passed Date in Context", passedDate);

    if (passedDate) {
      try {
        const CheckNow = new Date();
        const checkTimeDiffInMs = passedDate - CheckNow;
        if (checkTimeDiffInMs > 0) {
          setStoreStatus(false);
          const intervalId = setInterval(() => {
            const now = new Date();
            const timeDiffInMs = passedDate - now;
            const timeDiffInSec = Math.floor(timeDiffInMs / 1000);
            const seconds = timeDiffInSec % 60;
            const minutes = Math.floor((timeDiffInSec / 60) % 60);
            const hours = Math.floor((timeDiffInSec / 3600) % 24);
            const days = Math.floor((timeDiffInSec / 3600 / 24) % 30);

            setTimeDiff({ days, hours, minutes, seconds });
          }, 1000);

          return () => clearInterval(intervalId);
        } else {
          setStoreStatus(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [passedDate]);

  return (
    <StoreDetailsContext.Provider
      value={{
        StoreStatus,
        passedDate,
        timeDiff,
      }}
    >
      {children}
    </StoreDetailsContext.Provider>
  );
};
