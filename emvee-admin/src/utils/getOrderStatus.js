import { Timestamp } from "firebase/firestore";
import getCount from "../Services/functions/GetCountFromFirebase";

function DaysBefore(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}

export async function getOrderStatus(status, days) {
  try {
    let startTimestamp = null;
    if (days) {
      const startDate = new Date();
      const _DaysBefore = DaysBefore(startDate, days);
      _DaysBefore.setHours(0, 0, 0, 0);
      startTimestamp = Timestamp.fromDate(_DaysBefore);
    }
    const data = await getCount({
      column: "or4",
      queryD: "s.c",
      value: status,
      value2: startTimestamp,
    });
    return data || 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
