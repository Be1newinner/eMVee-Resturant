import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { firebaseAuth } from "../../../Infrastructure/firebase.config";
import {
  fetchAllCategories,
  fetchAllProducts,
} from "../../../Services/AllProducts/AllProductsService";
import { addProducts } from "../../../Services/Slices/AllProductsSlice";
import { addCategories } from "../../../Services/Slices/AllCategoriesSlice";

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigation.replace("BottomTab");
        } else {
          navigation.navigate("VerifyEmail");
        }
      }
    });
  }, [firebaseAuth]);

  const LoadingApp = () => {
    (async function () {
      const data = await fetchAllProducts();
      const cat = await fetchAllCategories();
      dispatch(addProducts(data));
      dispatch(addCategories(cat));
    })();
  };

  useEffect(() => {
    LoadingApp();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: "assets:/food.png" }} />
        <Text style={styles.text}>100+ Recipe</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E5002B",
    maxHeight: Dimensions.get("screen").height,
  },
  img: {
    width: "100%",
    height: 250,
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    color: "white",
    fontSize: 60,
    fontWeight: "500",
    marginTop: 50,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    padding: 20,
    width: 350,
    alignItems: "center",
    marginTop: 280,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
