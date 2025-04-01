import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";

import { GlobalColors } from "@/infrastructure/GlobalVariables";
import TopView from "@/components/TopView";
import AddToCart from "@/components/AddToCart";
import { OrderConfirmModal } from "@/components/OrderConfirmModal";
import { addInCart, resetCart } from "@/services/Slices/CartSlice";
import addOrderController from "@/services/OrdersController/addOrderController";
import { LoadingModal } from "@/components/LoadingModal";
import { getImageURL } from "@/services/offline/Image";
import { PAGES_STACK, PAGES_TAB } from "@/constants/Pages";

import sendNotificationToAdmin from "@/services/apis/sendNotifications";
import getAdminTokens from "@/services/apis/getAdminTokens";

export default function CartScreen() {
  const router = useRouter();
  const CartSelector = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const AddressSelector = useSelector((state) => state.Address);
  const AuthSelector = useSelector((state) => state.Authentication);
  const [LoadingScreen, setLoadingScreen] = useState(false);
  const [ConfirmClicked, setConfirmClicked] = useState(false);
  const [CartData, setCartData] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [authState, setAuthState] = useState(null);
  const [visible, setVisible] = useState(false);

  const ConfirmOrder = async () => {
    try {
      setLoadingScreen(true);

      const response = await addOrderController({
        CartSelector: CartSelector,
        AddressSelector,
        authState,
      });

      const orderItems = Object.values(CartSelector?.items) || [];
      const personName =
        AddressSelector?.addresses?.filter(
          (e) => e.k == AddressSelector?.default
        )[0]?.n || "no name";

      if (AddressSelector?.addresses?.length < 1) {
        router.navigate(PAGES_STACK.ADD_ADDRESS_SCREEN);
      }

      const orderTime = Date.now();
      const orderTotal = CartSelector.total || 0;

      if (response.status === 200) {
        const orderData = {
          type: 7,
          name: personName,
          id: "",
          time: orderTime,
          total: orderTotal,
          items: orderItems,
        };

        orderData.id = response?.orderID || "";

        const data = await getAdminTokens();
        const adminTokens = Object.values(data);

        adminTokens?.forEach((e) => {
          sendNotificationToAdmin({
            token: e,
            orderData,
          });
        });

        setConfirmClicked(true);
        dispatch(resetCart());
        router.replace({
          pathname: PAGES_STACK.ORDER_CONFIRM,
          params: {
            orderID: response?.orderID,
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  useEffect(() => {
    if (ConfirmClicked) {
      if (CartSelector.subtotal == 0) {
        router.replace(PAGES_TAB.HOME_SCREEN);
      }
    }

    if (CartSelector.subtotal != 0) {
      setCartData(CartSelector?.items);
      setCartTotal({
        total: CartSelector?.total || 0,
        subtotal: CartSelector?.subtotal || 0,
        tax: CartSelector?.tax || 0,
        delivery: CartSelector?.delivery || 0,
        discount: CartSelector?.discount || 0,
      });
    } else {
      setCartData(null);
      setCartTotal({
        total: 0,
        subtotal: 0,
        tax: 0,
        delivery: 0,
        discount: 0,
      });
    }
  }, [CartSelector]);

  useEffect(() => {
    try {
      const auth = AuthSelector.auth;
      setAuthState(auth);
    } catch (error) {
      console.log(error);
    }
  }, [AuthSelector.auth]);

  return (
    <ScrollView
      style={{
        backgroundColor: GlobalColors.primary,
      }}
    >
      <View>
        <TopView position="relative" color="#000" title={"Your Cart"} />

        {cartTotal?.subtotal != 0 ? (
          <View>
            <View
              style={{
                padding: 10,
                marginTop: 20,
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 600,
                  marginLeft: 10,
                }}
              >
                Cart Items
              </Text>
              {CartData &&
                Object.values(CartData)
                  ?.filter((e) => e?.qty > 0)
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
                        {item?.i ? (
                          <Image
                            source={{ uri: getImageURL(item.k) }}
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
                              {item?.t?.slice(0, 1)}
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
                          {item?.t}
                        </Text>
                        <Text>
                          {item?.qty} x ₹{item?.pd ? item?.pd : item?.p}
                        </Text>
                        <AddToCart
                          Quantity={item?.qty}
                          item={item}
                          variant={1}
                        />
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
                          ₹{item?.total}
                        </Text>
                      </View>
                    </View>
                  ))}
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                gap: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                elevation: 5,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                Your Orders
              </Text>
              <View>
                {[
                  {
                    key: "SubTotal",
                    value: `₹${cartTotal?.subtotal}`,
                  },
                  {
                    key: "Tax",
                    value: `₹${cartTotal?.tax}`,
                  },
                  {
                    key: "Delivery",
                    value: `₹${cartTotal?.delivery}`,
                  },
                  {
                    key: "Discount",
                    value: `₹${cartTotal?.discount}`,
                  },
                  {
                    key: "Total",
                    value: `₹${cartTotal?.total}`,
                  },
                ].map((e) => (
                  <View
                    key={e.key}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{e.key}</Text>
                    <Text>{e.value}</Text>
                  </View>
                ))}
              </View>
              <Button status="danger" onPress={ConfirmOrder}>
                Confirm Order
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              marginTop: Dimensions.get("window").height * 0.05,
            }}
          >
            <Image
              source={require("../../assets/cart-empty.webp")}
              style={{
                width: 300,
                height: 300,
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Your cart is empty
            </Text>
            <Pressable
              style={{
                backgroundColor: "black",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
              onPress={() => router.push("/tabs/HomeScreen")}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                Browse products
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <LoadingModal visible={LoadingScreen} />
      <OrderConfirmModal visible={visible} setVisible={setVisible} />
    </ScrollView>
  );
}
