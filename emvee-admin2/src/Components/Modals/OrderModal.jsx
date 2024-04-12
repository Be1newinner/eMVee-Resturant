import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Select,
  Text,
  SelectItem,
} from "@ui-kitten/components";
import { View } from "react-native";
import OrderTime from "../../Services/Offline/OrderTime";

export const OrderModal = ({
  visible,
  setVisible,
  onConfirm = () => null,
  title = "",
  subTitle = "",
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [IndexError, setIndexError] = useState(null);

  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onBackdropPress={() => {
        setVisible(false);
      }}
    >
      <Card disabled={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {title}
          </Text>
          {subTitle && <Text>{subTitle}</Text>}
        </View>

        {title?.toLowerCase()?.includes("accept") ? (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Select
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
            >
              {Object.values(OrderTime)?.map((e) => (
                <SelectItem key={e.key} title={e.title + " Minutes"} />
              ))}
            </Select>
            {IndexError ? <Text status="danger">{IndexError}</Text> : null}
          </View>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            width: "auto",
          }}
        >
          <Button
            status="basic"
            onPress={() => setVisible(false)}
            style={{
              flex: 1,
            }}
          >
            No
          </Button>
          <Button
            onPress={async () => {
              if (selectedIndex || !title?.toLowerCase()?.includes("accept")) {
                onConfirm(selectedIndex);
                setVisible(false);
                setIndexError(null);
              } else {
                setIndexError("Please Select an Option!");
              }
            }}
            status="danger"
            style={{
              flex: 1,
            }}
          >
            Yes
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
