import { FlatList, Image, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { useSelector } from "react-redux";

export default function OrdersScreen({ navigation }) {
  const OrdersSelector = useSelector((state) => state.Orders);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GlobalColors.primary,
      }}
    >
      <FlatList
        ListHeaderComponent={
          <View style={{ gap: 20 }}>
            <TopView
              navigation={navigation}
              title="My Orders"
              position="relative"
              color="#000"
              style={{ marginBottom: 20 }}
            />
            {Object.values(OrdersSelector).length ? null : (
              <>
                <Image
                  source={require("../../../../assets/cart-empty.webp")}
                  width={300}
                  height={300}
                  style={{
                    width: 300,
                    height: 300,
                    objectFit: "contain",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  You do not have any order with us.
                </Text>
              </>
            )}
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              height: 100,
            }}
          />
        }
        data={Object.values(OrdersSelector)}
        contentContainerStyle={{
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(e) => e.orderID}
        renderItem={({ item, index }) => {
          // console.log(index, item.orderID);
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
              onPress={() => item.action && navigation.navigate(item.action)}
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
                  Order ID #{item.orderID}
                </Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate("OrdersDetails", {
                      order: item.orderID,
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
                      item.s.c == 2 ? "#5c5" : item.s.c == 1 ? "#f00" : "#55d",
                    borderRadius: 20,
                  }}
                />
                <Text
                  style={{
                    color:
                      item.s.c == 2 ? "#5c5" : item.s.c == 1 ? "#f00" : "#55d",
                    fontWeight: 500,
                  }}
                >
                  {item.s.c == 2
                    ? "Delivered"
                    : item.s.c == 1
                    ? "Out for Delivery"
                    : item.s.c == -1
                    ? "Cancelled"
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
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
