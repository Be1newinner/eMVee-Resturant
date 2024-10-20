import { Dimensions, Image, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { GlobalColors } from "../../../infrasrtructure/GlobalVariables";
import TopView from "../../../components/TopView";
import AddToCart from "../../../components/AddToCart";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { OrderConfirmModal } from "../../../components/OrderConfirmModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addInCart, resetCart } from "../../../services/Slices/CartSlice";
import addOrderController from "../../../services/OrdersController/addOrderController";
import { LoadingModal } from "../../../components/LoadingModal";
import { getImageURL } from "../../../services/offline/Image";
import { ref, child, get } from "firebase/database";
import { realtimeDB } from "../../../infrasrtructure/firebase.config";

// Import useRouter hook from Expo Router
import { useRouter } from "expo-router";

export default function CartBottomScreen() {
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

  // Use the router hook for navigation
  const router = useRouter();

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
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "key=AAAAQt84_LQ:APA91bHJ1GLtZEBEdmMVE0zMC0Y_ZC_PYFdeDgLQIAeMPTdi-vlt07cPwYi1IMHT1FIXvVbSiioKIru-Y_Ja6uXO5uchYr9rKSqxEnZTO5AIz8d2wkNA4apzrUa7qDzHB5vdG2hswu7f"
      );
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        to: token,
        notification: {
          title: "New Order Recieved!",
          body: "You have a new Order",
        },
        data: orderData,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      await fetch("https://fcm.googleapis.com/fcm/send", requestOptions);
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
        // console.log("Admin Tokens =>", adminTokens);
        adminTokens?.forEach((e) => {
          sendNotificationToAdmin({
            token: e,
            orderData,
          });
        });

        setConfirmClicked(true);
        dispatch(resetCart());
        // Use router.replace to navigate
        router.replace("/order-confirm", { orderID: response?.orderID });
      }

      setLoadingScreen(false);
    } catch (error) {
      console.log(error);
      setLoadingScreen(false);
    }
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ConfirmClicked) {
      if (selector.subtotal == 0) {
        // Use router.replace to navigate to BottomTab
        router.replace("/(tabs)");
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
    setRecieverAddress(
      AddressSelector?.addresses?.filter(
        (e) => e.k == AddressSelector.default
      )[0]
    );
  }, [AddressSelector]);

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
            {/* Cart items rendering */}
            {/* Confirm Order Button */}
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
                    // Use router.push to navigate
                    router.push("/add-address");
                  }
                } else {
                  router.push("/login");
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
              source={require("../../../assets/cart-empty.webp")}
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
