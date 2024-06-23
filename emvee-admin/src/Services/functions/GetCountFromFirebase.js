import { firestoreDB } from "../../Infrastructure/firebase.config";
import {
  collection,
  where,
  getCountFromServer,
  query,
} from "firebase/firestore";

export default async function getCount({ column, queryD, value, value2 }) {
  try {
    const coll = collection(firestoreDB, column);
    if (queryD && value2) {
      const q = await query(
        coll,
        where("s.c", "==", value),
        where("s.2", ">=", value2)
      );
      const snapshot = await getCountFromServer(q);
      return await snapshot.data().count;
    } else if (queryD) {
      const q = await query(coll, where(queryD, "==", value));
      const snapshot = await getCountFromServer(q);
      return await snapshot.data().count;
    } else {
      const q = await query(coll);
      const snapshot = await getCountFromServer(q);
      return await snapshot.data().count;
    }
  } catch (error) {
    console.warn("ERROR GETTING COUNT : ", error);
    return 0;
  }
}
