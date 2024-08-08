import { StyleSheet } from "react-native";
import { GlobalColors } from "../../../Infrastructure/GlobalVariables";

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  container: {
    gap: 10,
    padding: 20,
    flex: 1,
    backgroundColor: GlobalColors.primary,
  },
  formContainer: {
    gap: 20,
  },
  input: {
    elevation: 5,
  },
  checkbox: {
    marginTop: 20,
  },
  productListContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  productListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productListTitle: {
    margin: 10,
    fontWeight: "900",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
  button: {
    flex: 1,
  },
});

export default styles;
