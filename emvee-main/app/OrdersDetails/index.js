import { Dimensions, ScrollView, Text, View } from "react-native";
import { GlobalColors } from "@/Infrastructure/GlobalVariables";
import TopView from "@/components/TopView";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderStatus from "@/Services/offline/OrderStatus";
import { Button } from "@ui-kitten/components";
import { OrderCancelModal } from "@/components/OrderCancelModal";

export default function OrdersDetails({ navigation, route }) {
  const OrderID = route.params?.order;
  const OrdersSelector = useSelector((state) => state.Orders);
  const [OrdersItems, setOrderItems] = useState(null);
  const [isCancelModalVisible, setisCancelModalVisible] = useState(false);

  useEffect(() => {
    const OrderDetails = OrdersSelector[OrderID];
    if (OrderDetails) {
      setOrderItems({
        status: OrderDetails.s.c,
        items: Object.values(OrderDetails?.i) || [],
        subtotal: OrderDetails?.p?.s,
        taxes: OrderDetails?.p?.x,
        delivery: OrderDetails?.p?.c,
        discount: OrderDetails?.p?.d,
        total: OrderDetails?.p?.t,
        saving: 0,
        date: new Date(OrderDetails?.s?.[0].seconds * 1000).toLocaleString(),
        contact: OrderDetails?.u?.p,
        reciever: OrderDetails?.u?.n,
        deliver: OrderDetails?.u?.a,
        deliveredTime: OrderDetails?.s?.[3]?.seconds || 0,
        willBeDeliveredTime: OrderDetails?.s?.t?.seconds || 0,
        CancelReason: OrderDetails?.s?.r || "",
      });
    }
    // console.log(OrderID, OrderDetails?.s?.c);
  }, [OrdersSelector]);

  const cancelOrderFunction = async () => {
    setisCancelModalVisible(true);
    // setIsCancelOrderLoader(true);
    // try {
    // const docRef = await doc(firestoreDB, "or4", OrderID);
    // await updateDoc(docRef, {
    //   "s.c": -1,
    //   "s.-1": new Timestamp.now(),
    //   "s.r": "CANCELLED By User!!",
    // });
    // setIsCancelled(true);
    // dispatch(cancelOrder(OrderID));
    // } catch (error) {
    //   console.log(error);
    //   setIsCancelOrderLoader(false);
    // }
    // setIsCancelOrderLoader(false);
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
                  backgroundColor: OrderStatus[OrdersItems?.status]?.color,
                  borderRadius: 20,
                }}
              />
              <Text
                style={{
                  color: OrderStatus[OrdersItems?.status]?.color,
                }}
              >
                {OrderStatus[OrdersItems?.status]?.title}
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
            {OrdersItems?.items?.map((product, index) => (
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
            <View
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
            </View>
            {OrdersItems?.taxes ? (
              <View
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
              </View>
            ) : null}
            <View
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
            </View>

            {OrdersItems?.discount ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>Discount</Text>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  - ₹{OrdersItems?.discount}
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
                ₹
                {OrdersItems?.subtotal +
                  OrdersItems?.taxes +
                  OrdersItems?.delivery -
                  OrdersItems?.discount}
              </Text>
            </View>

            {OrdersItems?.saving != 0 && (
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
                  Total Saving{"   "}₹{OrdersItems?.saving}/-
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
            {OrdersItems?.status != -1 ? (
              <View>
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  {OrdersItems?.status == 3
                    ? "Delievered "
                    : "Expected Delievery "}
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
                    ? new Date(
                        OrdersItems?.deliveredTime * 1000
                      ).toLocaleString()
                    : new Date(
                        OrdersItems?.willBeDeliveredTime * 1000
                      ).toLocaleString()}
                </Text>
              </View>
            ) : null}
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
            {OrdersItems?.CancelReason ? (
              <View>
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  Cancel Reason
                </Text>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  {OrdersItems?.CancelReason}
                </Text>
              </View>
            ) : null}
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
        {[0, 1, 2].includes(Number(OrdersItems?.status)) ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <OrderCancelModal
              visible={isCancelModalVisible}
              setVisible={setisCancelModalVisible}
              cancelID={OrderID}
            />
            <Button
              style={{
                maxWidth: 200,
                elevation: 5,
              }}
              status="basic"
              onPress={() => cancelOrderFunction()}
            >
              Cancel Order
            </Button>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
