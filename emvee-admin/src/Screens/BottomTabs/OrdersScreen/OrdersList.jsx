import { FlatList, Image, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useSelector } from "react-redux";
// import RealtimeOrdersController from "../../../Services/OrdersController/RealtimeOrdersController";

export default function OrdersList({
  navigation,
  title = "Processing Orders",
  status = 0,
}) {
  const OrdersSelector = useSelector((state) => state.Orders);
  return (
    <FlatList
      ListHeaderComponent={
        <>
          {/* <RealtimeOrdersController status={status} /> */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              marginLeft: 20,
            }}
          >
            {title}
          </Text>
        </>
      }
      ListFooterComponent={
        <View
          style={{
            height: 100,
          }}
        ></View>
      }
      data={Object.values(OrdersSelector).filter((e) => e.s.c == status)}
      contentContainerStyle={{
        gap: 10,
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(e) => e.orderID}
      renderItem={({ item, index }) => {
        // console.log(index, item);
        return (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              elevation: 5,
              gap: 10,
            }}
            onPress={() => item?.action && navigation.navigate(item?.action)}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "rgba(100,100,105,1)",
                  flex: 1,
                  fontWeight: 500,
                }}
              >
                Order ID #{item?.orderID}
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate("OrdersDetails", {
                    order: item?.orderID,
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: GlobalColors.productText,
                    fontWeight: 600,
                  }}
                >
                  Order Details
                </Text>
              </Pressable>
            </View>

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
                    item?.s.c == 2 ? "#5c5" : item?.s.c == 1 ? "#f00" : "#55d",
                  borderRadius: 20,
                }}
              />
              <Text
                style={{
                  color:
                    item?.s.c == 2 ? "#5c5" : item?.s.c == 1 ? "#f00" : "#55d",
                  fontWeight: 500,
                }}
              >
                {item?.s.c == 2
                  ? "Delivered"
                  : item?.s.c == 1
                  ? "Out for Delivery"
                  : item?.s.c == -1
                  ? "Cancelled!"
                  : "Processing"}
              </Text>
            </View>

            <View
              style={{
                gap: 10,
                padding: 0,
              }}
            >
              {Object.values(item?.i)?.map((product) => (
                <View
                  key={product.k}
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

              <View>
                <Text
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {item?.u?.n}
                </Text>
                <Text>{item?.u?.a.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}
