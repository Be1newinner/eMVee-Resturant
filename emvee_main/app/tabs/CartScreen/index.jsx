import { Dimensions, Image, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, child, get } from "firebase/database";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";

import { GlobalColors } from "@/infrasrtructure/GlobalVariables";
import TopView from "@/components/TopView";
import AddToCart from "@/components/AddToCart";
import { OrderConfirmModal } from "@/components/OrderConfirmModal";
import { addInCart, resetCart } from "@/services/Slices/CartSlice";
import addOrderController from "@/services/OrdersController/addOrderController";
import { LoadingModal } from "@/components/LoadingModal";
import { getImageURL } from "@/services/offline/Image";
import { realtimeDB } from "@/infrasrtructure/firebase.config";
import { PAGES_STACK, PAGES_TAB } from "../../../constants/Pages";

export default function CartScreen() {
  const router = useRouter();
  const selector = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const AddressSelector = useSelector((state) => state.Address);
  const AuthSelector = useSelector((state) => state.Authentication);
  const [LoadingScreen, setLoadingScreen] = useState(false);
  const [ConfirmClicked, setConfirmClicked] = useState(false);
  const [CartData, setCartData] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [authState, setAuthState] = useState(null);

  const getAdminTokens = async () => {
    try {
      let data;
      const dbRef = await ref(realtimeDB);
      await get(child(dbRef, `token`)).then((snapshot) => {
        snapshot.exists() && (data = snapshot.val());
      });
      return data;
    } catch (error) {
      console.log("Getting ADMIN TOKEN ERROR => ", error);
      return null;
    }
  };

  const sendNotificationToAdmin = async ({ token, orderData }) => {
    if (!token) return null;
    try {
      await fetch('https://e-m-vee-resturant.vercel.app/api/send-pn', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: "New Order Recieved!",
          message: "You have a new Order",
          scopeKey: "@be1newinner/emvee-admin",
          experienceId: "@be1newinner/emvee-admin",
          channelId: "default",
        }),
      });

    } catch (error) {
      console.log("UNABLE TO SEND NOTIFICATION TO ADMIN => ", error);
    }
  };

  const ConfirmOrder = async () => {
    try {
      setLoadingScreen(true);

      const response = await addOrderController({
        CartSelector: selector,
        AddressSelector,
        authState,
      });

      const orderItems = Object.values(selector?.items) || [];
      const personName =
        AddressSelector?.addresses?.filter(
          (e) => e.k == AddressSelector?.default
        )[0]?.n || "no name";

      if (AddressSelector?.addresses?.length < 1) {
        router.navigate(PAGES_STACK.ADD_ADDRESS_SCREEN)
      }

      const orderTime = Date.now();
      const orderTotal = selector.total || 0;

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
            orderID: response?.orderID
          }
        });
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ConfirmClicked) {
      if (selector.subtotal == 0) {
        router.replace(PAGES_TAB.HOME_SCREEN);
      }
    }

    if (selector.subtotal != 0) {
      setCartData(selector?.items);
      setCartTotal({
        total: selector?.total || 0,
        subtotal: selector?.subtotal || 0,
        tax: selector?.tax || 0,
        delivery: selector?.delivery || 0,
        discount: selector?.discount || 0,
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
  }, [selector]);

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
        <TopView
          position="relative"
          color="#000"
          title={"Your Cart"}
        />

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
                          {item?.qty} x ₹{item?.p}
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
              <Button
                status="danger"
                onPress={ConfirmOrder}
              >
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
              marginTop: Dimensions.get("window").height * 0.2,
            }}
          >
            <Image
              source={require("../../../assets/cart-empty.webp")}
              style={{
                width: 300,
                height: 300,
              }}
            />
          </View>
        )}
      </View>

      <LoadingModal visible={LoadingScreen} />
      <OrderConfirmModal visible={visible} setVisible={setVisible} />
    </ScrollView>
  );
}
