import { ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
// import RealtimeOrdersController from "../../../Services/OrdersController/RealtimeOrdersController";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import LogOut from "../../../Services/LogOut";
import { resetOrders } from "../../../Services/Slices/OrdersSlice";
import { resetProducts } from "../../../Services/Slices/AllProductsSlice";
import { resetCategories } from "../../../Services/Slices/AllCategoriesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoreStatus from "../../Stack/StoreStatus";
import getCount from "../../../Services/functions/GetCountFromFirebase";

export default function DashboardScreen({ navigation }) {
  const OrdersSelector = useSelector((state) => state.Orders);
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);
  const dispatch = useDispatch();

  const [TotalProducts, setTotalProducts] = useState(0);
  const [TotalCategories, setTotalCategories] = useState(0);
  const [TotalUsers, setTotalUsers] = useState(0);
  const [ProcessingArray, setProcessingArray] = useState({});
  const [CancelledArray, setCancelledArray] = useState({});
  const [DeliveredArray, setDeliveredArray] = useState({});

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
    await LogOut({ AsyncStorage, navigation });
  };

  useEffect(() => {
    // Total Users Count
    (async function () {
      try {
        const data = await getCount({ column: "us7" });
        setTotalUsers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function getOrderStatus(status, days) {
    try {
      let startTimestamp = null;

      if (days) {
        const startDate = new Date();
        const _DaysBefore = DaysBefore(startDate, days);
        _DaysBefore.setHours(0, 0, 0, 0);
        startTimestamp = Timestamp.fromDate(_DaysBefore);
        // console.log("week", sevenDaysBefore);
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

  useEffect(() => {
    // Deliveries

    (async function () {
      let today = 0;

      try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(startDate);
        // console.log("Today", startDate);
        today = await getCount({
          column: "or4",
          queryD: "s.c",
          value: 3,
          value2: startTimestamp,
        });
      } catch (error) {
        console.log(error);
      }

      setDeliveredArray({
        Today: {
          label: "Today",
          value: today,
        },
        Week: {
          label: "Week",
          value: await getOrderStatus(3, 7),
        },
        Month: {
          label: "Month",
          value: await getOrderStatus(3, 30),
        },
        Total: {
          label: "Total",
          value: await getOrderStatus(3),
        },
      });
    })();
  }, []);

  useEffect(() => {
    // Cancelled

    (async function () {
      let today = 0;

      try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(startDate);
        // console.log("Today", startDate);
        today = await getCount({
          column: "or4",
          queryD: "s.c",
          value: 3,
          value2: startTimestamp,
        });
      } catch (error) {
        console.log(error);
      }
      setCancelledArray({
        Rejected: {
          label: "Rejected",
          value: today,
        },
        Cancel: {
          label: "Cancel",
          value: await getOrderStatus(-1, 7),
        },
        Failed: {
          label: "Failed",
          value: await getOrderStatus(3, 30),
        },
        Total: {
          label: "Total",
          value: await getOrderStatus(3),
        },
      });
    })();
  }, []);

  useEffect(() => {
    setProcessingArray({
      Pending: {
        label: "Pending",
        value: Object.values(OrdersSelector).filter(({ s }) => s.c == 0).length,
      },
      Accept: {
        label: "Accept",
        value: Object.values(OrdersSelector).filter(({ s }) => s.c == 1).length,
      },
      OFD: {
        label: "OFD",
        value: Object.values(OrdersSelector).filter(({ s }) => s.c == 2).length,
      },
      Total: {
        label: "Total",
        value:
          Object.values(OrdersSelector).filter(({ s }) => s.c == 0).length +
          Object.values(OrdersSelector).filter(({ s }) => s.c == 1).length +
          Object.values(OrdersSelector).filter(({ s }) => s.c == 2).length,
      },
    });
  }, [OrdersSelector]);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: GlobalColors.primary,
          padding: 10,
          paddingBottom: 100,
        }}
      >
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

          {/* Orders Tab */}
          <View
            style={{
              backgroundColor: GlobalColors.themeColor,
              flexWrap: "wrap",
              flexDirection: "row",
              borderRadius: 10,
              elevation: 5,
              paddingVertical: 20,
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
              Processing Orders
            </Text>

            <View
              style={{
                flexBasis: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {Object.values(ProcessingArray)?.map((item) => (
                <View
                  key={item.label}
                  style={{
                    flexBasis: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

            <Text
              style={{
                flexBasis: "100%",
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Cancelled Orders
            </Text>

            <View
              style={{
                flexBasis: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {Object.values(CancelledArray)?.map((item) => (
                <View
                  key={item.label}
                  style={{
                    flexBasis: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

            <Text
              style={{
                flexBasis: "100%",
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Delivered Orders
            </Text>

            <View
              style={{
                flexBasis: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {Object.values(DeliveredArray).map((item) => (
                <View
                  key={item.label}
                  style={{
                    flexBasis: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Other Details Tab */}

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
          {/* Close Store Option */}

          <Text
            style={{
              fontWeight: 600,
              marginBottom: 5,
              fontSize: 16,
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            Manage Store Status
          </Text>

          <StoreStatus />
        </View>
      </View>
    </ScrollView>
  );
}
