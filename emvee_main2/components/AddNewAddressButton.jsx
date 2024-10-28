import { Button } from "@ui-kitten/components";
import React from "react";
import { useRouter } from "expo-router";

export default function AddNewAddressButton() {
  const router = useRouter();

  return (
    <Button
      status="danger"
      style={{
        fontSize: 12,
        marginTop: 3,
        fontWeight: 700,
      }}
      appearance="outline"
      onPress={() => router.navigate("Stack/AddNewAddressScreen")}
    >
      Add a New Address
    </Button>
  );
}
