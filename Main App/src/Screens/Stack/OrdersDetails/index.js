import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { AllProductsData } from "../../../Services/OfflineDataToLive";

export default function OrdersDetails({ navigation, route }) {
  const OrdersItems = [
    {
      orderID: 124596,
      status: 0,
      items: AllProductsData.slice(0, 2).map((e) => ({
        ...e,
        quantity: Math.floor(Math.random() * 10),
        mrp: e.Price + 50,
      })),
    },
  ];

  const OrderDetail = route.params?.order;

  console.log("OrderDetail => ", OrderDetail);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
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
            gap: 10,
            paddingBottom: 40,
          }}
        >
          {OrdersItems?.map((item) => (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                elevation: 5,
                gap: 10,
              }}
              key={item.orderID}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor:
                      item.status === 1
                        ? "#f00"
                        : item.status === 1
                        ? "#0f0"
                        : "#55d",
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    color:
                      item.status === 1
                        ? "#f00"
                        : item.status === 1
                        ? "#0f0"
                        : "#55d",
                  }}
                >
                  {item.status === 1
                    ? "On Delivery"
                    : item.status === 1
                    ? "Delivered"
                    : "Processing"}
                </Text>
              </View>

              <View
                style={{
                  gap: 10,
                  padding: 0,
                }}
              >
                {item?.items?.map((product, index) => (
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
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
