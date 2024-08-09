import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome } from "@expo/vector-icons";

import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import LogOut from "../../../Services/LogOut";
import { resetOrders } from "../../../redux/Slices/OrdersSlice";
import { resetProducts } from "../../../redux/Slices/AllProductsSlice";
import { resetCategories } from "../../../redux/Slices/AllCategoriesSlice";
import StoreStatus from "../../Stack/StoreStatus";
import getCount from "../../../Services/functions/GetCountFromFirebase";
import { getOrderStatus } from "../../../utils/getOrderStatus";
import { DashboardCard, DashboardSection, OrderStats } from "./components";
import Header2 from "../../../Components/Header2";

export default function DashboardScreen({ navigation }) {
  const OrdersSelector = useSelector((state) => state.Orders);
  const categorySelector = useSelector((state) => state.AllCategories);
  const productsSelector = useSelector((state) => state.AllProducts);
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

  const logOutUser = async () => {
    await dispatch(resetOrders());
    await dispatch(resetProducts());
    await dispatch(resetCategories());
    await LogOut({ AsyncStorage, navigation });
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await getCount({ column: "us7" });
        setTotalUsers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      let today = 0;
      try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(startDate);
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
        Today: { label: "Today", value: today },
        Week: { label: "Week", value: await getOrderStatus(3, 7) },
        Month: { label: "Month", value: await getOrderStatus(3, 30) },
        Total: { label: "Total", value: await getOrderStatus(3) },
      });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      let today = 0;
      try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const startTimestamp = Timestamp.fromDate(startDate);
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
        Rejected: { label: "Rejected", value: today },
        Cancel: { label: "Cancel", value: await getOrderStatus(-1, 7) },
        Failed: { label: "Failed", value: await getOrderStatus(3, 30) },
        Total: { label: "Total", value: await getOrderStatus(3) },
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
    <>
      <Header2
        title="eMVee Restaurant"
        rightIcon={
          <FontAwesome name="sign-out" size={28} onPress={logOutUser} />
        }
      />
      <ScrollView
        onLayout={async () => {
          await SplashScreen.hideAsync();
        }}
      >
        <View style={styles.container}>
          <DashboardSection>
            <OrderStats title="Processing Orders" stats={ProcessingArray} />
            <OrderStats title="Cancelled Orders" stats={CancelledArray} />
            <OrderStats title="Delivered Orders" stats={DeliveredArray} />
          </DashboardSection>
          <DashboardSection title="Other Details">
            <View style={styles.otherDetailsContainer}>
              <DashboardCard
                label="Products"
                value={TotalProducts}
                containerStyle={{
                  flexBasis: "33%",
                }}
              />
              <DashboardCard
                label="Categories"
                value={TotalCategories}
                containerStyle={{
                  flexBasis: "33%",
                }}
              />
              <DashboardCard
                label="Users"
                value={TotalUsers}
                containerStyle={{
                  flexBasis: "33%",
                }}
              />
            </View>
          </DashboardSection>
          <DashboardSection title="Manage Store Status">
            <StoreStatus />
          </DashboardSection>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.primary,
    padding: 10,
    paddingTop: 80,
    paddingBottom: 100,
  },
  otherDetailsContainer: {
    backgroundColor: "#eee",
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 10,
    elevation: 5,
  },
});
