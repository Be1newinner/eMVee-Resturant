import React from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import styles from "../styles";

const FooterButtons = ({ navigation, onPressSave, isEditing }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        status="basic"
        onPress={() => navigation.goBack()}
        style={[
          styles.button,
          {
            borderColor: "red",
          },
        ]}
      >
        Cancel
      </Button>
      <Button onPress={onPressSave} status="danger" style={styles.button}>
        {isEditing ? "Save" : "Add"} Category
      </Button>
    </View>
  );
};

export { FooterButtons };
