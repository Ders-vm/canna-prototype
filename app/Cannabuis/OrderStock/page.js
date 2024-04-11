"use client";
import { useState, useEffect } from "react";
import NewItem from "../Components/NewItem";
import ItemList from "../Components/ItemList";
import { useUserAuth } from "../_utils/auth-context";
import { addItem, getItems } from "../_services/CannabuisServices";

export default function Page() {
  const { user } = useUserAuth(); // Access the user object from the authentication context

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch items only if the user is authenticated
    if (user) {
      getItems(user.uid)
        .then((items) => {
          setItems(items);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    }
  }, [user]);

  function handleAddItem(item) {
    if (user && user.uid) {
      addItem(user.uid, item)
        .then((itemId) => {
          const newItem = { id: itemId, ...item };
          setItems((prevItems) => [...prevItems, newItem]);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    } else {
      console.error("User object or user.uid is undefined");
    }
  }

  function handleItemClick(item) {
    setSelectedItem(item);
  }

  return (
    <div>
      <header></header>
      <main className="flex flex-col md:flex-row">
        <div className="flex-1 md:mr-4">
          <div className="flex">
            <div className="flex-1">
              <ItemList items={items} onItemClick={handleItemClick} />
            </div>
            <div className="flex-1">
              <NewItem onAddItem={handleAddItem} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
