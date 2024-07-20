import { Dimensions, ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@ui-kitten/components";
import { OrderModal } from "../../../Components/Modals/OrderModal";
import { useState } from "react";
import {
  cancelOrder,
  deliverOrderReducer,
} from "../../../Services/Slices/OrdersSlice";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import OrderStatus from "../../../Services/Offline/OrderStatus";
import { cancelOrderFunction, confirmOrder } from "./OrderDetailsController";
import { OrdersItemsModel } from "./OrdersItemsModel";
import { CancelStatus } from "../../../Services/Offline/CancelStatus";

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
  const [CancelReason, setCancelReason] = useState("");

  const OrdersItems = OrdersItemsModel({ OrderDetails });

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
                    : OrderStatus[OrdersItems.status].color,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  color: isCancelled
                    ? "rgba(0,0,0,0.7)"
                    : isDelivered
                    ? "#0f0"
                    : OrderStatus[OrdersItems.status].color,
                }}
              >
                {isCancelled
                  ? "Order Cancelled"
                  : isDelivered
                  ? "Order Delivered"
                  : OrderStatus[OrdersItems.status].title}
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

            {OrdersItems?.delivery ? (
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
                  Sub total
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
            ) : null}
            {OrdersItems?.delivery ? (
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
                  delivery
                </Text>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  ₹{OrdersItems?.delivery}
                </Text>
              </View>
            ) : null}
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
                ₹{OrdersItems?.total}
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
                {OrdersItems?.status == 3 ? "Delievered" : "Expected Delievery"}{" "}
                on
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrdersItems?.status == 0
                  ? "Waiting for admin to accept Order!"
                  : OrdersItems?.status == 3
                  ? new Date(OrdersItems?.deliveredTime * 1000).toLocaleString()
                  : new Date(
                      OrdersItems?.willBeDeliveredTime * 1000
                    ).toLocaleString()}
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
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
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
              <View
                style={{
                  flexDirection: "row",
                  gap: 25,
                }}
              >
                <MaterialIcons
                  onPress={async () => {
                    await Linking.openURL(
                      `tel:${OrdersItems?.contact.toString()}`
                    );
                  }}
                  name="call"
                  size={30}
                  color="black"
                />
                <FontAwesome5
                  onPress={async () => {
                    await Linking.openURL(
                      `https://api.whatsapp.com/send/?phone=91${OrdersItems?.contact.toString()}&text&type=phone_number&app_absent=0`
                    );
                  }}
                  name="whatsapp"
                  size={30}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  Alternate Number
                </Text>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  {OrdersItems?.alternate.toString()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 25,
                }}
              >
                <MaterialIcons
                  onPress={async () => {
                    await Linking.openURL(
                      `tel:${OrdersItems?.alternate.toString()}`
                    );
                  }}
                  name="call"
                  size={30}
                  color="black"
                />
                <FontAwesome5
                  onPress={async () => {
                    await Linking.openURL(
                      `https://api.whatsapp.com/send/?phone=91${OrdersItems?.alternate.toString()}&text&type=phone_number&app_absent=0`
                    );
                  }}
                  name="whatsapp"
                  size={30}
                  color="black"
                />
              </View>
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
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            <Button
              status="danger"
              appearance="outline"
              style={{
                flex: 1,
              }}
              onPress={() => {
                if (!CancelLoading) {
                  setAcceptModal(false);
                  setCancelModal(true);
                }
              }}
            >
              {CancelLoading
                ? "please wait..."
                : CancelStatus[OrderDetails?.s.c].title}
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
                : "Mark as " + OrderStatus[OrderDetails?.s.c].mark + " !"}
            </Button>
          </View>
        )}

        <OrderModal
          title={
            "Do you want to " +
            CancelStatus[OrderDetails?.s.c]?.title +
            " Order?"
          }
          toStatus={CancelStatus[OrderDetails?.s.c]?.key}
          CancelReason={CancelReason}
          setCancelReason={setCancelReason}
          onConfirm={() =>
            cancelOrderFunction({
              OrderID,
              setCancelLoading,
              setIsCancelled,
              dispatch,
              cancelOrder,
              phoneNumber: OrdersItems?.alternate,
              orderCancelStatus: CancelStatus[OrderDetails?.s.c]?.key,
              CancelReason,
            })
          }
          visible={CancelModal}
          setVisible={setCancelModal}
        />
        <OrderModal
          title={OrderStatus[OrderDetails?.s.c].mark}
          subTitle={`Mark the order as ${OrderStatus[OrderDetails?.s.c].mark}`}
          onConfirm={async (e) => {
            await confirmOrder({
              selectedIndex: e,
              OrderID,
              status: OrderStatus[OrderDetails?.s.c].next,
              setStatusLoading,
              setIsDelivered,
              dispatch,
              deliverOrderReducer,
              phoneNumber: OrdersItems?.alternate,
            });
          }}
          visible={AcceptModal}
          setVisible={setAcceptModal}
        />
      </View>
    </ScrollView>
  );
}
