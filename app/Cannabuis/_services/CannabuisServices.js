// File: _services/CannabuisServices.js

import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import axios from 'axios';

export async function updateItemQuantity(itemId, quantity) {
  try {
    const response = await axios.put(`/api/items/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    throw new Error('Error updating item quantity:', error);
  }
}


// Function to retrieve items for a specific user
export async function getItems(userId) {
  const items = [];
  
  // Reference to the items subcollection under the user's document
  const itemsRef = collection(db, `users/${userId}/items`);
  
  // Query to fetch documents from the items subcollection
  const itemsSnapshot = await getDocs(itemsRef);

  // Loop through the documents and add them to the items array
  itemsSnapshot.forEach((doc) => {
    items.push({ id: doc.id, data: doc.data() });
  });

  return items;
}

// Function to add a new item for a specific user
export async function addItem(userId, item) {
  // Reference to the items subcollection under the user's document
  const itemsRef = collection(db, `users/${userId}/items`);

  // Add the item to the items subcollection and get the document reference
  const docRef = await addDoc(itemsRef, item);

  // Return the ID of the newly created document
  return docRef.id;
}
