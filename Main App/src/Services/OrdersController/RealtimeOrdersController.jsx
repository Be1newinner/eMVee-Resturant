import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  firebaseAuth,
  firestoreDB,
} from "../../Infrastructure/firebase.config";
import { useDispatch } from "react-redux";
import { addOrder } from "../Slices/OrdersSlice";

import {
  fetchAllCategories,
  fetchAllProducts,
} from "../../Services/AllProducts/AllProductsService";
import { addProducts } from "../../Services/Slices/AllProductsSlice";
import { addCategories } from "../../Services/Slices/AllCategoriesSlice";
import { onAuthStateChanged } from "firebase/auth";

export default function RealtimeOrdersController() {
  const dispatch = useDispatch();

  const LoadingApp = () => {
    (async function () {
      const data = await fetchAllProducts();
      const cat = await fetchAllCategories();
      dispatch(addProducts(data));
      dispatch(addCategories(cat));
    })();
  };

  useEffect(() => {
    (async function () {
      onAuthStateChanged(firebaseAuth, async (user) => {
        // console.log(" a ", user.uid);
        if (user) {
          LoadingApp();

          const q = await query(
            collection(firestoreDB, "or4"),
            where("u.u", "==", user.uid)
          );

          onSnapshot(q, (querySnapshot) => {
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
        }
      });
    })();
  }, [firebaseAuth]);

  return <></>;
}
