import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { useSelector } from "react-redux";

export default function OrdersDetails({ navigation, route }) {
  const OrderID = route.params?.order;
  const OrdersSelector = useSelector((state) => state.Orders);
  const OrderDetails = OrdersSelector[OrderID];
  console.log(OrderID, Object.keys(OrderDetails.status).includes("0"));

  const OrdersItems = {
    status: Object.keys(OrderDetails.status).includes("2")
      ? 2
      : Object.keys(OrderDetails.status).includes("1")
      ? 1
      : 0,
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

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
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
                  backgroundColor:
                    OrdersItems.status === 1
                      ? "#f00"
                      : OrdersItems.status === 1
                      ? "#0f0"
                      : "#55d",
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  color:
                    OrdersItems.status === 1
                      ? "#f00"
                      : OrdersItems.status === 1
                      ? "#0f0"
                      : "#55d",
                }}
              >
                {OrdersItems.status === 1
                  ? "Out for Delivery"
                  : OrdersItems.status === 1
                  ? "Order Delivered"
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
            {OrdersItems?.items?.map((product, index) => (
              <View
                key={index}
                style={{ height: "auto", flexDirection: "row", gap: 10 }}
              >
                {product.i ? (
                  <Image
                    source={product.i}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 8,
                    }}
                  />
                ) : (
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
                )}
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
      </View>
    </ScrollView>
  );
}
