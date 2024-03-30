import { Dimensions, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useEffect, useState } from "react";
import OrdersList from "./OrdersList";
// import RealtimeOrdersController from "../../../Services/OrdersController/RealtimeOrdersController";
import { useSelector } from "react-redux";

export default function OrdersScreen({ navigation }) {
  const [ListType, setListType] = useState(0);
  const [ProcessingCount, setProcessingCount] = useState(0);
  const [OFDCount, setOFDCount] = useState(0);
  const OrdersSelector = useSelector((state) => state.Orders);

  useEffect(() => {
    setOFDCount(Object.values(OrdersSelector).filter((e) => e.s.c == 1).length);
    setProcessingCount(
      Object.values(OrdersSelector).filter((e) => e.s.c == 0).length
    );
  }, [OrdersSelector]);
  return (
    <View
      style={{
        backgroundColor: GlobalColors.primary,
        flex: 1,
      }}
    >
      <View
        style={{
          width: Dimensions.get("screen").width,
          flexDirection: "row",
          gap: 2,
          marginBottom: 20,
        }}
      >
        <Pressable
          style={{
            backgroundColor: GlobalColors.themeColor,
            flex: 1,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
          }}
          onPress={() => setListType(0)}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: 700,
            }}
          >
            Processing
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {ProcessingCount}
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: GlobalColors.themeColor,
            flex: 1,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
          }}
          onPress={() => setListType(1)}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: 700,
            }}
          >
            OFD
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {OFDCount}
          </Text>
        </Pressable>
      </View>
      {ListType === 0 ? (
        <OrdersList navigation={navigation} />
      ) : (
        <OrdersList
          status={ListType}
          title="Out for Delivery Orders"
          navigation={navigation}
        />
      )}
    </View>
  );
}
