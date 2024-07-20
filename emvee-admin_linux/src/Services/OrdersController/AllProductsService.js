import { collection, getDocs, query } from "firebase/firestore";
import { firestoreDB } from "../../Infrastructure/firebase.config";

export const fetchAllProducts = async () => {
  const products = [];
  const data = await getDocs(query(collection(firestoreDB, "pr47")));

  data.forEach((item) => {
    products.push({
      ...item.data(),
      k: item.id,
    });
  });

  return products;
};

export const fetchAllCategories = async () => {
  const categories = [];
  const data = await getDocs(query(collection(firestoreDB, "ca8")));

  data.forEach((item) => {
    categories.push({
      ...item.data(),
      k: item.id,
    });
  });

  return categories;
};
