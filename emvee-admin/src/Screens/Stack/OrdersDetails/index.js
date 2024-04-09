import { Dimensions, ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { useSelector, useDispatch } from "react-redux";
import { Button, Spinner } from "@ui-kitten/components";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../../Infrastructure/firebase.config";
// import RealtimeOrdersController from "../../../Services/OrdersController/RealtimeOrdersController";
import { OrderModal } from "../../../Components/Modals/OrderModal";
import { useState } from "react";
import {
  cancelOrder,
  deliverOrderReducer,
} from "../../../Services/Slices/OrdersSlice";

export default function OrdersDetails({ navigation, route }) {
  const OrderID = route.params?.order;
  const OrdersSelector = useSelector((state) => state.Orders);
  const dispatch = useDispatch();
  const OrderDetails = OrdersSelector[OrderID];
  const [CancelModal, setCancelModal] = useState(false);
  const [AcceptModal, setAcceptModal] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [CancelLoading, setCancelLoading] = useState(false);
  const [StatusLoading, setStatusLoading] = useState(false);

  const OrdersItems = {
    status: OrderDetails?.s.c,
    items: Object.values(OrderDetails?.i) || [],
    subtotal: OrderDetails?.p?.s,
    taxes: OrderDetails?.p?.x,
    delivery: OrderDetails?.p?.c,
    total: OrderDetails?.p?.t,
    saving: 0,
    date: new Date().toLocaleString(),
    contact: OrderDetails?.u?.p,
    reciever: OrderDetails?.u?.n,
    deliver: OrderDetails?.u?.a,
  };

  const cancelOrderFunction = async ({ OrderID }) => {
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

  const confirmOrder = async ({ OrderID, status }) => {
    setStatusLoading(true);
    const docRef = await doc(firestoreDB, "or4", OrderID);
    if (status == 1)
      await updateDoc(docRef, {
        "s.c": 1,
        "s.1": new Timestamp.now(),
      });

    if (status == 2) {
      try {
        await updateDoc(docRef, {
          "s.c": 2,
          "s.2": new Timestamp.now(),
        });
        setIsDelivered(true);
        dispatch(deliverOrderReducer(OrderID));
      } catch (error) {
        console.log("DELIVERY ERROR ", error);
      }
    }
    setStatusLoading(false);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      {/* <RealtimeOrdersController /> */}
      <View
        style={{
          paddingBottom: 50,
        }}
      >
        <TopView
          navigation={navigation}
          title={
            <Text
              style={{
                fontSize: 18,
                color: "#000",
                flex: 1,
                fontWeight: 800,
              }}
            >
              Order ID #{OrderID}
            </Text>
          }
          position="relative"
          color="#000"
          style={{ marginBottom: 20 }}
        />

        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            elevation: 5,
            gap: 5,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              fontSize: 22,
            }}
          >
            Order Summary
          </Text>

          <View
            style={{
              gap: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Your Order
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginRight: 5,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: isCancelled
                    ? "rgba(0,0,0,0.7)"
                    : isDelivered
                    ? "#0f0"
                    : OrdersItems.status === 1
                    ? "#f00"
                    : OrdersItems.status === 2
                    ? "#0f0"
                    : "#55d",
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  color: isCancelled
                    ? "rgba(0,0,0,0.7)"
                    : isDelivered
                    ? "#0f0"
                    : OrdersItems.status === 1
                    ? "#f00"
                    : OrdersItems.status === 2
                    ? "#0f0"
                    : "#55d",
                }}
              >
                {isCancelled
                  ? "Order Cancelled"
                  : isDelivered
                  ? "Order Delivered"
                  : OrdersItems.status === 1
                  ? "Out for Delivery"
                  : OrdersItems.status === 2
                  ? "Order Delivered"
                  : OrdersItems.status === -1
                  ? "Order Cancelled!"
                  : "Processing"}
              </Text>
            </View>
          </View>
          <View
            style={{
              gap: 10,
              paddingTop: 5,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.15)",
              marginHorizontal: 10,
            }}
          >
            {OrdersItems?.items
              ?.filter((e) => e.qty > 0)
              ?.map((product, index) => (
                <View
                  key={index}
                  style={{ height: "auto", flexDirection: "row", gap: 10 }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: GlobalColors.themeColor,
                      height: "auto",
                      aspectRatio: 1,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {product.t.slice(0, 1)}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 5,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "rgba(0,0,0,0.75)",
                        fontWeight: 600,
                      }}
                    >
                      {product.t}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "rgba(0,0,0,0.75)",
                          fontWeight: 600,
                        }}
                      >
                        ₹{product?.p}/-
                      </Text>
                      {product?.m && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: GlobalColors.productText,
                            fontWeight: 600,
                            textDecorationLine: "line-through",
                          }}
                        >
                          ₹{product?.m}/-
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: GlobalColors.productText,
                        fontWeight: 600,
                      }}
                    >
                      x{product?.qty}/-
                    </Text>
                  </View>
                </View>
              ))}
          </View>
          <View
            style={{
              gap: 5,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.15)",
              paddingVertical: 10,
              marginBottom: 5,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Billing Details
            </Text>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text>Subtotal</Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                ₹{OrdersItems?.subtotal}
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text>Taxes</Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                ₹{OrdersItems?.taxes}
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text>Delivery</Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                {OrdersItems?.delivery === 0
                  ? "Free"
                  : "₹" + OrdersItems?.delivery}
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                ₹{OrdersItems?.subtotal}
              </Text>
            </View>

            {OrdersItems.saving != 0 && (
              <View
                appearance="outline"
                status="danger"
                style={{
                  width: Dimensions.get("screen").width - 100,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: GlobalColors.themeColor,
                  backgroundColor: "rgba(240,24,64,0.11)",
                  borderRadius: 5,
                  padding: 5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: GlobalColors.themeColor,
                  }}
                >
                  Total Saving{"   "}₹{OrdersItems.saving}/-
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              gap: 10,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Other Details
            </Text>
            <View>
              <Text
                style={{
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                Order ID
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrderID}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                Order Date & Time
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrdersItems?.date}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                Receiver Name
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrdersItems?.reciever}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                Receiver Number
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrdersItems?.contact.toString()}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                Deliver to
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrdersItems?.deliver.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {isDelivered || isCancelled ? null : (
          <View
            status="danger"
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              flex: 1,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Button
              style={{
                flex: 1,
              }}
              status="danger"
              appearance="outline"
              onPress={() => {
                if (!CancelLoading) {
                  setAcceptModal(false);
                  setCancelModal(true);
                }
              }}
            >
              {CancelLoading ? "please wait..." : "cancel order"}
            </Button>
            <Button
              style={{
                flex: 1,
              }}
              status="danger"
              onPress={() => {
                if (!StatusLoading) {
                  setAcceptModal(true);
                  setCancelModal(false);
                }
              }}
            >
              {StatusLoading
                ? "please wait..."
                : OrderDetails?.s.c == 0
                ? "Mark OFD?"
                : "Mark Delivered?"}
            </Button>
          </View>
        )}

        <OrderModal
          title="Do you want to cancel Order?"
          onConfirm={() => cancelOrderFunction({ OrderID })}
          visible={CancelModal}
          setVisible={setCancelModal}
        />
        <OrderModal
          title={OrderDetails?.s.c == 0 ? "Mark OFD?" : "Mark Delivered?"}
          subTitle={`Mark the order as${
            OrderDetails?.s.c == 0 ? " Out for Delivery!" : " Delivered!"
          }`}
          onConfirm={async () => {
            await confirmOrder({
              OrderID,
              status: OrderDetails?.s.c == 0 ? 1 : 2,
            });

            // console.log("ON CONFIRM CLICKED!");
          }}
          visible={AcceptModal}
          setVisible={setAcceptModal}
        />
      </View>
    </ScrollView>
  );
}
