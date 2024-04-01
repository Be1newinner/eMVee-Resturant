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
import { addInCart, resetCart } from "../../../Services/Slices/CartSlice";
import addOrderController from "../../../Services/OrdersController/addOrderController";
import { LoadingModal } from "../../../Components/LoadingModal";

export default function CartScreen({ navigation }) {
  const selector = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const AddressSelector = useSelector((state) => state.Address);
  const AuthSelector = useSelector((state) => state.Authentication);
  const [LoadingScreen, setLoadingScreen] = useState(false);
  const [ConfirmClicked, setConfirmClicked] = useState(false);
  const [CartData, setCartData] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [authState, setAuthState] = useState(null);
  const [RecieverAddress, setRecieverAddress] = useState(null);

  const ConfirmOrder = async () => {
    setLoadingScreen(true);

    const response = await addOrderController({
      CartSelector: selector,
      AddressSelector,
      authState,
    });

    if (response.status === 200) {
      setConfirmClicked(true);
      dispatch(resetCart());
      navigation.replace("OrderConfirm", { orderID: response?.orderID });
    }

    setLoadingScreen(false);
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ConfirmClicked) {
      if (selector.subtotal == 0) {
        navigation.replace("BottomTab");
      }
    }

    if (selector.subtotal != 0) {
      // console.log("Have Data => ", selector);
      setCartData(selector?.items);
      setCartTotal({
        total: selector?.total || 0,
        subtotal: selector?.subtotal || 0,
        tax: selector?.tax || 0,
        delivery: selector?.delivery || 0,
        discount: selector?.discount || 0,
      });
    } else {
      // console.log("No Data => ", selector);
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
    setRecieverAddress(
      AddressSelector?.addresses?.filter(
        (e) => e.k == AddressSelector.default
      )[0]
    );
  }, [AddressSelector]);

  useEffect(() => {
    try {
      const auth = AuthSelector.auth;
      // console.log("a", AuthSelector);
      // const user = AuthSelector.user;
      // console.log(auth);
      setAuthState(auth);
      // setUserState(user);
      // AsyncStorage.removeItem("user");
      // AsyncStorage.removeItem("auth");
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
          navigation={navigation}
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
                          ₹{item?.p * item?.qty}/-
                        </Text>
                      </View>
                    </View>
                  ))}

              <Text
                style={{
                  fontWeight: 600,
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                Cart Total
              </Text>

              <View
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  elevation: 5,
                  gap: 10,
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
                    ₹{cartTotal?.subtotal}/-
                  </Text>
                </View>
                {cartTotal?.discount ? (
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
                      - ₹{cartTotal?.discount}/-
                    </Text>
                  </View>
                ) : null}
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
                    ₹{cartTotal?.tax}/-
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
                        cartTotal?.delivery == 0
                          ? GlobalColors.themeColor
                          : "black",
                    }}
                  >
                    {cartTotal?.delivery == 0
                      ? "Free"
                      : "₹" + cartTotal?.delivery + "/-"}
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
                    ₹{cartTotal?.total}/-
                  </Text>
                </View>
              </View>

              {/* ------------------------------------------------------------------ */}
              {authState?.phone_no ? (
                RecieverAddress ? (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          marginTop: 10,
                        }}
                      >
                        Reciever Details
                      </Text>
                      <Text
                        style={{
                          fontWeight: 600,
                          marginTop: 10,
                          color: "rgb(50,100,256)",
                        }}
                        onPress={() => navigation.navigate("AddAddressScreen")}
                      >
                        Change Details
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        elevation: 5,
                        gap: 10,
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
                          Name
                        </Text>
                        <Text
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {RecieverAddress?.n}
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
                          Phone
                        </Text>
                        <Text
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {RecieverAddress?.p}
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
                          Address
                        </Text>
                        <Text
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {RecieverAddress?.h.toUpperCase() +
                            ", " +
                            RecieverAddress?.l.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : null
              ) : null}
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
              onPress={() => {
                if (authState?.phone_no?.length == 10) {
                  if (RecieverAddress) {
                    setVisible(true);
                  } else {
                    navigation.navigate("AddAddressScreen");
                  }
                } else {
                  navigation.navigate("LoginWithPhone");
                  // console.log("Logging in");
                }
              }}
            >
              {authState?.phone_no?.length == 10
                ? RecieverAddress
                  ? "Confirm Order"
                  : "Add Address"
                : "Login to Order"}
            </Button>
            <OrderConfirmModal
              visible={visible}
              setVisible={setVisible}
              onConfirm={() => ConfirmOrder()}
            />
            <LoadingModal visible={LoadingScreen} />
          </View>
        ) : (
          <View
            style={{
              gap: 20,
              paddingTop: 20,
            }}
          >
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
              Your cart is empty!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
