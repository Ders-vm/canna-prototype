// CartPage.js
"use client";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, updateItemQuantity } from "../_services/CannabuisServices";
import CartItemList from "../Components/CartItemList";
import AddToCartList from "../Components/AddToCartList";

export default function CartPage() {
  const { user } = useUserAuth();
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (user) {
          const fetchedItems = await getItems(user.uid);
          setItems(fetchedItems);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [user]);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const handleSellItem = async (itemId) => {
    // Find the item to sell
    const itemToSell = cartItems.find((item) => item.id === itemId);
    if (!itemToSell) return;

    // Update quantity in the database
    try {
      await updateItemQuantity(itemId, 0); // Set quantity to 0 in the database
      console.log('Item quantity updated in the database.');
    } catch (error) {
      console.error('Error updating item quantity in the database:', error);
    }

    // Remove the item from the cart
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <header></header>
      <main className="flex flex-col md:flex-row">
        <div className="flex-1 md:mr-4">
          <div className="flex">
            <div className="flex-1">
              <AddToCartList items={items} onAddToCart={handleAddToCart} />
            </div>
            <div className="flex-1">
              <CartItemList items={cartItems} onSellItem={handleSellItem} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
