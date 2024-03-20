import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { useSelector } from "react-redux";

export default function OrdersDetails({ navigation, route }) {
  const OrderDetail = route.params?.order;
  const AllProductsData = useSelector(state=>state.AllProducts)

  const OrdersItems = {
    orderID: 124596,
    status: 0,
    items: AllProductsData.slice(0, 2).map((e) => ({
      ...e,
      quantity: Math.floor(Math.random() * 10),
      mrp: e.Price + 50,
    })),
    subtotal: 500,
    taxes: 55,
    delivery: 0,
    total: 555,
    saving: 50,
    date: new Date().toLocaleString(),
    contact: 8130506284,
    deliver:
      "Home, H80/9, M1 Block, Near Hunar Hospital, Sangam Vihar, New Delhi, 110062",
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
              Order ID #{OrderDetail?.orderID}
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
                  ? "On Delivery"
                  : OrdersItems.status === 1
                  ? "Your Order is Delivered"
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
                <Image
                  source={product.image}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 8,
                  }}
                />
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
                    {product.title}
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
                      ₹{product?.Price}/-
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: GlobalColors.productText,
                        fontWeight: 600,
                        textDecorationLine: "line-through",
                      }}
                    >
                      ₹{product?.mrp}/-
                    </Text>
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
                    x{product?.quantity}/-
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
                {OrdersItems?.orderID}
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
                Contact Number
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {OrdersItems?.contact.toString().slice(0, 5)}xxxxx
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
                {OrdersItems?.deliver}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
