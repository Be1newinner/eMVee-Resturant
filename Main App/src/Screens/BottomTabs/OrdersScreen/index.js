import { FlatList, Image, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import { useSelector } from "react-redux";

export default function OrdersScreen({ navigation }) {

  const AllProductsData = useSelector(state=>state.AllProducts)

  const OrdersItems = [
    {
      orderID: 124596,
      status: 0,
      items: AllProductsData.slice(0, 2).map((e) => ({
        ...e,
        quantity: Math.floor(Math.random() * 10) + 1,
        mrp: e.Price + 50,
      })),
    },
    {
      orderID: 124597,
      status: 1,
      items: AllProductsData.slice(0, 2).map((e) => ({
        ...e,
        quantity: Math.floor(Math.random() * 10),
        mrp: e.Price + 50,
      })),
    },
    {
      orderID: 124598,
      status: 2,
      items: AllProductsData.slice(0, 2).map((e) => ({
        ...e,
        quantity: Math.floor(Math.random() * 10),
        mrp: e.Price + 50,
      })),
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <TopView
          navigation={navigation}
          title="My Orders"
          position="relative"
          color="#000"
          style={{ marginBottom: 20 }}
        />
      }
      ListFooterComponent={
        <View
          style={{
            height: 100,
          }}
        ></View>
      }
      data={OrdersItems}
      contentContainerStyle={{
        gap: 10,
        backgroundColor: GlobalColors.primary,
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(e) => e.orderID}
      renderItem={({ item }) => (
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
                navigation.navigate("OrdersDetails", { order: item })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  color: GlobalColors.productText,
                  fontWeight: 600,
                }}
              >
                View Order Details
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
                  item.status === 1
                    ? "#f00"
                    : item.status === 2
                    ? "#5c5"
                    : "#55d",
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                color:
                  item.status === 1
                    ? "#f00"
                    : item.status === 2
                    ? "#5c5"
                    : "#55d",
                fontWeight: 500,
              }}
            >
              {item.status === 1
                ? "On Delivery"
                : item.status === 2
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
      )}
    />
  );
}
