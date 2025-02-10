import { Button } from "@ui-kitten/components";
import React from "react";
import { useRouter } from "expo-router";
import { PAGES_STACK } from "../constants/Pages";

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
      onPress={() => router.navigate(PAGES_STACK.ADD_NEW_ADDRESS_SCREEN)}
    >
      Add a New Address
    </Button>
  );
}
