import { Dimensions, Image, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
import AddToCart from "../../../Components/AddToCart";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { OrderConfirmModal } from "../../../Components/OrderConfirmModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "../../../Services/Slices/CartSlice";

export default function CartScreen({ navigation }) {
  const selector = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  const cartTotal = {
    total: selector?.total || 0,
    subtotal: selector?.subtotal || 0,
    tax: selector?.tax || 0,
    delivery: selector?.delivery || 0,
    discount: selector?.discount || 0,
  };

  const ConfirmOrder = () => {
    navigation.navigate("OrderConfirm");
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Object.values(selector.items).filter((e) => e.qty > 0).length < 1) {
      navigation.goBack();
    }
  }, [selector]);

  return (
    <ScrollView
      style={{
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <TopView
          position="relative"
          navigation={navigation}
          color="#000"
          title={"Your Cart"}
        />
      </View>
      <View
        style={{
          padding: 10,
          marginTop: 20,
          gap: 10,
        }}
      >
        {Object.values(selector.items)
          .filter((e) => e.qty > 0)
          ?.map((item) => (
            <View
              key={item.k}
              style={{
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 20,
                elevation: 5,
                flexDirection: "row",
                gap: 20,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "rgba(0,0,0,0.25)",
                }}
              >
                {item.i ? (
                  <Image
                    source={item.i}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 5,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 500,
                        fontSize: 32,
                        color: GlobalColors.themeColor,
                      }}
                    >
                      {item.t.slice(0, 1)}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: GlobalColors.themeColor,
                  }}
                >
                  {item.t}
                </Text>
                <Text>
                  {item.qty} x ₹{item.p}
                </Text>
                <AddToCart Quantity={item.qty} item={item} variant={1} />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginRight: 5,
                }}
              >
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color={GlobalColors.themeColor}
                  onPress={() => {
                    dispatch(
                      addInCart({
                        ...item,
                        qty: 0,
                        total: 0,
                      })
                    );
                  }}
                />
                <Text
                  style={{
                    fontWeight: 600,
                    color: GlobalColors.themeColor,
                    fontSize: 16,
                  }}
                >
                  ₹{item.p * item.qty}/-
                </Text>
              </View>
            </View>
          ))}

        <View
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            elevation: 5,
            gap: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              ₹{cartTotal.subtotal}/-
            </Text>
          </View>
          {cartTotal.discount && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                Discount
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                }}
              >
                - ₹{cartTotal.discount}/-
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Taxes
            </Text>
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              ₹{cartTotal.tax}/-
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Delivery
            </Text>
            <Text
              style={{
                fontWeight: 500,
                color:
                  cartTotal.delivery == 0 ? GlobalColors.themeColor : "black",
              }}
            >
              {cartTotal.delivery == 0
                ? "Free"
                : "₹" + cartTotal.delivery + "/-"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              borderTopColor: "rgba(0,0,0,0.25)",
              borderTopWidth: 1,
              paddingTop: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              ₹{cartTotal.total}/-
            </Text>
          </View>
        </View>
      </View>
      <Button
        status="danger"
        style={{
          width: Dimensions.get("screen").width - 20,
          position: "relative",
          bottom: 0,
          left: 10,
          marginBottom: 40,
        }}
        onPress={() => setVisible(true)}
      >
        Confirm Order
      </Button>
      <OrderConfirmModal
        visible={visible}
        setVisible={setVisible}
        onConfirm={ConfirmOrder}
      />
    </ScrollView>
  );
}
