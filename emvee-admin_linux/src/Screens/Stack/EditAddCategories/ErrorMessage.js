import React from "react";
import { Text } from "@ui-kitten/components";

const ErrorMessage = ({ error }) =>
  error ? (
    <Text status="danger" style={styles.error}>
      {error}
    </Text>
  ) : null;

const styles = {
  error: {
    fontWeight: 700,
  },
};

export default ErrorMessage;
