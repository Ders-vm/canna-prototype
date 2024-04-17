// File: _services/CannabuisServices.js

import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import axios from 'axios';

// Function to update the item quantity by a specific amount
export const updateItemQuantity = async (userId, itemId, decrement) => {
  const itemRef = doc(db, 'users', userId, 'items', itemId);

  try {
    // Get the current document snapshot
    const itemSnapshot = await getDoc(itemRef);
    if (itemSnapshot.exists()) {
      // Get current quantity
      const currentQuantity = itemSnapshot.data().quantity;
      if (currentQuantity >= decrement) {
        // Update quantity in the database by reducing it by the decrement amount
        await updateDoc(itemRef, {
          quantity: currentQuantity - decrement
        });
        console.log(`Successfully decreased the quantity of item ${itemId} by ${decrement}. New quantity: ${currentQuantity - decrement}`);
      } else {
        console.error(`Attempted to reduce more items than are available. Available: ${currentQuantity}, Tried to reduce: ${decrement}`);
      }
    } else {
      console.error('Item does not exist.');
    }
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
};



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
