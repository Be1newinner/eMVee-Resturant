import { Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
// import RealtimeOrdersController from "../../../Services/OrdersController/RealtimeOrdersController";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { firestoreDB } from "../../../Infrastructure/firebase.config";
import {
  collection,
  where,
  getCountFromServer,
  query,
  Timestamp,
} from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import LogOut from "../../../Services/LogOut";
import { resetOrders } from "../../../Services/Slices/OrdersSlice";
import { resetProducts } from "../../../Services/Slices/AllProductsSlice";
import { resetCategories } from "../../../Services/Slices/AllCategoriesSlice";

export default function DashboardScreen() {
  const OrdersSelector = useSelector((state) => state.Orders);
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const dispatch = useDispatch();

  const [CancelOrders, setCancelOrders] = useState(0);
  const [TodayDelivered, setTodayDelivered] = useState(0);
  const [WeekDelivered, setWeekDelivered] = useState(0);
  const [MonthDelivered, setMonthDelivered] = useState(0);
  const [TotalDelivered, setTotalDelivered] = useState(0);
  const [TotalProducts, setTotalProducts] = useState(0);
  const [TotalCategories, setTotalCategories] = useState(0);
  const [TotalUsers, setTotalUsers] = useState(0);

  async function getCount({ column, queryD, value, value2 }) {
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
  }

  useEffect(() => {
    setTotalCategories(categorySelector?.data?.length || 0);
    setTotalProducts(productsSelector?.data?.length || 0);
  }, [productsSelector, categorySelector?.data]);

  function DaysBefore(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  const logOutUser = async () => {
    await dispatch(resetOrders());
    await dispatch(resetProducts());
    await dispatch(resetCategories());
    await LogOut();
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await getCount({ column: "us7" });
        setTotalUsers(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = await getCount({
          column: "or4",
          queryD: "s.c",
          value: -1,
        });
        setCancelOrders(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = await getCount({ column: "us7" });
        setTotalUsers(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(startDate);
        // console.log("Today", startDate);
        const data = await getCount({
          column: "or4",
          queryD: "s.c",
          value: 2,
          value2: startTimestamp,
        });
        setTodayDelivered(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const startDate = new Date();
        const sevenDaysBefore = DaysBefore(startDate, 7);
        sevenDaysBefore.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(sevenDaysBefore);
        // console.log("week", sevenDaysBefore);

        const data = await getCount({
          column: "or4",
          queryD: "s.c",
          value: 2,
          value2: startTimestamp,
        });
        setWeekDelivered(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const startDate = new Date();
        const ThirtyDaysBefore = DaysBefore(startDate, 30);
        ThirtyDaysBefore.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(ThirtyDaysBefore);
        // console.log("month", ThirtyDaysBefore);

        const data = await getCount({
          column: "or4",
          queryD: "s.c",
          value: 2,
          value2: startTimestamp,
        });
        setMonthDelivered(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = await getCount({
          column: "or4",
          queryD: "s.c",
          value: 2,
        });
        setTotalDelivered(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      console.log("useEffect executed!");
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
        padding: 10,
      }}
    >
      {/* <RealtimeOrdersController status={0} />
      <RealtimeOrdersController status={1} /> */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          eMVee Dashboard
        </Text>
        <FontAwesome
          name="sign-out"
          size={28}
          color="black"
          onPress={async () => logOutUser()}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: 600,
            marginBottom: 5,
            fontSize: 16,
          }}
        >
          Orders
        </Text>
        <View
          style={{
            backgroundColor: GlobalColors.themeColor,
            flexWrap: "wrap",
            flexDirection: "row",
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              flexBasis: "100%",
              color: "#fff",
              fontWeight: 600,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Processing Orders
          </Text>
          <View
            style={{
              flexBasis: "33%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Processing
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {Object.values(OrdersSelector).filter((e) => e.s.c == 0).length}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "33%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              OFD
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {Object.values(OrdersSelector).filter((e) => e.s.c == 1).length}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "33%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Cancel
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {CancelOrders}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                flexBasis: "100%",
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Delivered Orders
            </Text>
            <View
              style={{
                flexBasis: "25%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Today
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {TodayDelivered}
              </Text>
            </View>
            <View
              style={{
                flexBasis: "25%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Week
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {WeekDelivered}
              </Text>
            </View>
            <View
              style={{
                flexBasis: "25%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Month
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {MonthDelivered}
              </Text>
            </View>
            <View
              style={{
                flexBasis: "25%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {TotalDelivered}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontWeight: 600,
            marginBottom: 5,
            fontSize: 16,
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          Other Details
        </Text>
        <View
          style={{
            backgroundColor: GlobalColors.themeColor,
            flexWrap: "wrap",
            flexDirection: "row",
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexBasis: "33%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Products
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {TotalProducts}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "33%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Categories
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {TotalCategories}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "33%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Users
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {TotalUsers}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
