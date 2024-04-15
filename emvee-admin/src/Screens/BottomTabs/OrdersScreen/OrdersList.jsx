import { FlatList, Image, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useSelector } from "react-redux";
import OrderStatus from "../../../Services/Offline/OrderStatus";
// import { useEffect } from "react";
// import RealtimeOrdersController from "../../../Services/OrdersController/RealtimeOrdersController";

export default function OrdersList({
  navigation,
  title = "Pending Orders",
  status = 0,
}) {
  const OrdersSelector = useSelector((state) => state.Orders);

  return (
    <FlatList
      ListHeaderComponent={
        <>
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
        />
      }
      data={Object.values(OrdersSelector)
        .filter((e) => e.s.c == status)
        ?.sort((a, b) => b.s?.[0]?.seconds - a.s?.[0]?.seconds)}
      contentContainerStyle={{
        gap: 10,
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(e) => e.orderID}
      renderItem={({ item, index }) => {
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
                  backgroundColor: OrderStatus[item.s.c]?.color,
                  borderRadius: 20,
                }}
              />
              <Text
                style={{
                  color: OrderStatus[item.s.c]?.color,
                  fontWeight: 500,
                }}
              >
                {OrderStatus[item.s.c]?.title}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                }}
              >
                Order Time
              </Text>
              <Text>
                {new Date(item?.s?.[0].seconds * 1000).toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                gap: 10,
                padding: 0,
              }}
            >
              {Object.values(item?.i)
                ?.filter((e) => e.qty > 0)
                ?.map((product) => (
                  <View
                    key={product.k}
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
