import { Dimensions, Pressable, Text, View } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import { useEffect, useState } from "react";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../../../Infrastructure/firebase.config";
import OrdersList from "./OrdersList";

export default function OrdersScreen({ navigation }) {
  const [ListType, setListType] = useState(0);
  const [ProcessingCount, setProcessingCount] = useState(10);
  const [OFDCount, setOFDCount] = useState(8);

  useEffect(() => {
    (async function () {
      const coll = collection(firestoreDB, "or4");
      const q = query(coll, where("s.c", "==", 0));
      const snapshot = await getCountFromServer(q);
      setProcessingCount(snapshot.data().count);

      const coll2 = collection(firestoreDB, "or4");
      const q2 = query(coll2, where("s.c", "==", 1));
      const snapshot2 = await getCountFromServer(q2);
      setOFDCount(snapshot2.data().count);
    })();

    console.log("Count executed!");
  }, []);
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
