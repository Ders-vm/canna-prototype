// CartPage.js
"use client";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, updateItemQuantity } from "../_services/CannabuisServices";
import CartItemList from "../Components/CartItemList";
import AddToCartList from "../Components/AddToCartList";
import NavBar from "../Components/navBar";

export default function CartPage() {
  const { user } = useUserAuth();
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);

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
  
  useEffect(() => {
    fetchItems();
  }, [user]);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Initialize both quantity and sellQuantity to 1 when item is first added to cart
      setCartItems(prevItems => [...prevItems, { ...item, quantity: 1, sellQuantity: 1 }]);
    }
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(currentItems => currentItems.map(cartItem => {
      if (cartItem.id === itemId) {
        return { ...cartItem, sellQuantity: newQuantity };
      }
      return cartItem;
    }));
  };
  
  const handleSellItem = async (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.sellQuantity > 0) {
      try {
        await updateItemQuantity(user.uid, itemId, item.sellQuantity);
        console.log('Item quantity updated in the database.');
  
        // Update cart state to reflect new quantity or remove the item if quantity becomes zero
        setCartItems(currentItems =>
          currentItems.map(cartItem =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity - item.sellQuantity }
              : cartItem
          ).filter(cartItem => cartItem.quantity > 0)
        );
  
        // Re-fetch items to update the list shown in AddToCartList
        fetchItems();  // Assuming fetchItems is refactored to be accessible here
  
      } catch (error) {
        console.error('Error updating item quantity in the database:', error);
      }
    } else {
      console.error("Invalid operation: sellQuantity is zero or not defined.");
    }
  };

  return (
    <div>
      <header></header>
      <main className="flex flex-col md:flex-row">
        <NavBar/>
        <div className="flex-1 md:mr-4">
          <div className="flex">
            <div className="flex-1">
              <AddToCartList items={items} onAddToCart={handleAddToCart} />
            </div>
            <div className="flex-1">
            <CartItemList items={cartItems} onSellItem={handleSellItem} onQuantityChange={handleQuantityChange} />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
