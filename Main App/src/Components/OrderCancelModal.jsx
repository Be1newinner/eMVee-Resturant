import React, { useState } from "react";
import { Button, Card, Input, Modal, Text } from "@ui-kitten/components";
import { View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { firestoreDB } from "../Infrastructure/firebase.config";
import { cancelOrder } from "../Services/Slices/OrdersSlice";

export const OrderCancelModal = ({ visible, setVisible, cancelID }) => {
  const [InputValue, setInputValue] = useState("");
  const [InputError, setInputError] = useState("");
  const [IsCancelOrderLoader, setIsCancelOrderLoader] = useState(false);
  const [IsCancelled, setIsCancelled] = useState(false);

  const dispatch = useDispatch();

  const cancelOrderFunction = async () => {
    if (!InputValue) {
      setInputError("Cancel Reason is Compulsory!");
      return;
    }

    setInputError("");

    setIsCancelOrderLoader(true);
    try {
      const docRef = await doc(firestoreDB, "or4", cancelID);
      await updateDoc(docRef, {
        "s.c": -4,
        "s.r": InputValue,
      });
      setIsCancelled(true);
      dispatch(cancelOrder(cancelID));
      console.log("ORDER CANCELLED!");
      setInputValue("");
      setInputError("");
      setVisible(false);
    } catch (error) {
      console.log(error);
      setIsCancelOrderLoader(false);
    }
    setIsCancelOrderLoader(false);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onBackdropPress={() => {
        setInputValue("");
        setInputError("");
        setVisible(false);
      }}
    >
      <Card disabled={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {/* <Text style={{ fontSize: 12, opacity: 0.7, marginLeft: 5 }}>
              {item.v}
            </Text> */}
            Cancel Order?
          </Text>
          <Input
            value={InputValue}
            label="Cancel Reason"
            placeholder="Please Input Your cancel Reason!"
            caption={() => {
              return InputError ? (
                <View>
                  <Text
                    status="danger"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {InputError}
                  </Text>
                </View>
              ) : null;
            }}
            onChangeText={(nextValue) => setInputValue(nextValue)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            width: "auto",
          }}
        >
          <Button
            status="basic"
            onPress={() => {
              setInputValue("");
              setInputError("");
              setVisible(false);
            }}
            style={{
              flex: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              !IsCancelOrderLoader && cancelOrderFunction();
            }}
            status="danger"
            style={{
              flex: 1,
            }}
          >
            {IsCancelOrderLoader ? "Waiting..." : "Cancel"}
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
