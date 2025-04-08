import { db } from "../_utils/supabase"; // import Firebase config

import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  doc,
  where,
} from "firebase/firestore";

// Function to listen for real-time updates on all events
export const subscribeToShoppingList = (onUpdate) => {
  try {
    const colRef = collection(db, "items");
    // const q = query(colRef, where("date", ">", new Date())); // only get events that have not yet occurred

    return onSnapshot(colRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      onUpdate(items);
    });
  } catch (error) {
    console.error("Error in subscribeToShoppingList: ", error);
  }
};

// Get one event by userid
export const getItems = async (userId) => {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const docSnapshot = await getDocs(itemsRef);

    const items = docSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // create a new object based on the one from the database
    return items;
  } catch (error) {
    console.error("Error in getEvent: ", error);
  }
};

// Add a new itemList
export const addItem = async (userId, item) => {
  try {
    // Ensure the itemList object contains necessary fields before attempting to add to the collection
    if (!item.name || !item.quantity || !item.category) {
      throw new Error(
        "The item object is missing required fields (name, quantity, or category)."
      );
    }

    const itemCollection = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemCollection, item);
    return docRef.id;
  } catch (error) {
    console.error("Error in addEvent:", error);
  }
};
