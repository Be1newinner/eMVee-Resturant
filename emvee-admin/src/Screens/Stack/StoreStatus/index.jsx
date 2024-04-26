import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Button, Input, Spinner, Text, Toggle } from "@ui-kitten/components";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";
import TopView from "../../../Components/TopView";
// import { StoreCloseModal } from "../../../Components/Modals/StoreCloseModal";

export default function StoreStatus({ navigation }) {
  const [activeChecked, setActiveChecked] = useState(true);
  const [StoreCloseModalStatus, setStoreCloseModalStatus] = useState(false);

  const ChangeStoreStatus = () => {
    if (activeChecked) {
      setStoreCloseModalStatus(true);
      setActiveChecked(false);
    } else {
      setActiveChecked(true);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexWrap: "wrap",
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>Store Status : </Text>
        <Toggle
          status="danger"
          checked={activeChecked}
          onChange={ChangeStoreStatus}
        />
      </View>
      {!activeChecked ? (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text>Store Closed till : </Text>
          <Text
            style={{
              fontWeight: 500,
              color: "red",
            }}
          >
            {new Date().toLocaleString()}
          </Text>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
        }}
      ></View>
      {/* <StoreCloseModal
        visible={StoreCloseModalStatus}
        setVisible={setStoreCloseModalStatus}
      /> */}
    </View>
  );
}
