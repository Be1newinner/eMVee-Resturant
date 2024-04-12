import { useEffect } from "react";
import { collection, query, where, onSnapshot, or } from "firebase/firestore";
import {
  firebaseAuth,
  firestoreDB,
} from "../../Infrastructure/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../Slices/OrdersSlice";
// import GetProductsController from "./GetProductsController";
import { addProducts } from "../Slices/AllProductsSlice";
import { addCategories } from "../Slices/AllCategoriesSlice";
import { fetchAllCategories, fetchAllProducts } from "./AllProductsService";
import { onAuthStateChanged } from "firebase/auth";

export default function RealtimeOrdersController() {
  const dispatch = useDispatch();
  const categorySelector = useSelector((selector) => selector.AllCategories);
  const productsSelector = useSelector((selector) => selector.AllProducts);

  const tdf =
    process.env.EXPO_PUBLIC_u2 +
    "" +
    process.env.EXPO_PUBLIC_u9 +
    "" +
    process.env.EXPO_PUBLIC_u1 +
    "" +
    process.env.EXPO_PUBLIC_u0;

  useEffect(() => {
    let snapshot;
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user?.uid == tdf) {
        console.log("A2");
        try {
          const q1 = await query(
            collection(firestoreDB, "or4"),
            or(
              where("s.c", "==", 0),
              where("s.c", "==", 1),
              where("s.c", "==", 2)
            )
          );
          snapshot = onSnapshot(q1, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              dispatch(
                addOrder(
                  JSON.stringify({
                    key: doc.id,
                    value: doc.data(),
                  })
                )
              );
            });
          });
        } catch (error) {
          console.log("REALTIME ERROR!");
        }
      } else {
        if (snapshot) {
          let data = snapshot();
          console.log("Unsubscription => ", data);
        }
        console.log("Logged out Data");
      }
    });

    return () => {
      console.log("Listener Unsubscription!");
    };
  }, [firebaseAuth]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user?.uid == tdf) {
        if (productsSelector?.data?.length == 0) {
          const products = await fetchAllProducts();
          dispatch(addProducts(products));
        } else {
          console.log("ProductSelector => ", productsSelector?.length);
        }

        if (categorySelector?.data?.length == 0) {
          const category = await fetchAllCategories();
          dispatch(addCategories(category));
        } else {
          console.log("categorySelector => ", categorySelector?.length);
        }
      } else {
        console.log("Logged out Data");
      }
    });
  }, [firebaseAuth]);
}
