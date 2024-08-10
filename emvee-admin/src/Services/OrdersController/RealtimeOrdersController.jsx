import { useEffect } from "react";
import { collection, query, where, onSnapshot, or } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { fetchAllCategories, fetchAllProducts } from "./AllProductsService";
import {
  firebaseAuth,
  firestoreDB,
} from "../../Infrastructure/firebase.config";
import { addProducts } from "../../redux/actions/allProducts";
import { addOrder } from "../../redux/Slices/OrdersSlice";
import { loadCategories } from "../../redux/actions/allCategories";

const useAuthUser = (tdf, onAuthSuccess, onAuthFail) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user?.uid === tdf) {
        onAuthSuccess();
      } else {
        onAuthFail();
      }
    });
    return () => unsubscribe();
  }, [tdf]);
};

const useRealtimeOrders = (tdf, dispatch) => {
  useAuthUser(
    tdf,
    () => {
      console.log("A2");
      try {
        const ordersQuery = query(
          collection(firestoreDB, "or4"),
          or(
            where("s.c", "==", 0),
            where("s.c", "==", 1),
            where("s.c", "==", 2)
          )
        );
        const unsubscribe = onSnapshot(ordersQuery, (querySnapshot) => {
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
        return () => unsubscribe();
      } catch (error) {
        console.log("REALTIME ERROR!", error);
      }
    },
    () => console.log("Logged out Data")
  );
};

const useLoadInitialData = (
  tdf,
  dispatch,
  productsSelector,
  categorySelector
) => {
  useAuthUser(
    tdf,
    async () => {
      if (productsSelector?.data?.length === 0) {
        const products = await fetchAllProducts();
        dispatch(addProducts(products));
      }

      if (categorySelector?.data?.length === 0) {
        const categories = await fetchAllCategories();
        dispatch(loadCategories(categories));
      }
    },
    () => console.log("Logged out Data")
  );
};

export default function RealtimeOrdersController() {
  const dispatch = useDispatch();
  const categorySelector = useSelector((state) => state.AllCategories);
  const productsSelector = useSelector((state) => state.AllProducts);

  const tdf =
    process.env.EXPO_PUBLIC_u2 +
    process.env.EXPO_PUBLIC_u9 +
    process.env.EXPO_PUBLIC_u1 +
    process.env.EXPO_PUBLIC_u0;

  useRealtimeOrders(tdf, dispatch);
  useLoadInitialData(tdf, dispatch, productsSelector, categorySelector);

  useEffect(() => {
    return () => {
      console.log("Listener Unsubscription!");
    };
  }, []);
}
