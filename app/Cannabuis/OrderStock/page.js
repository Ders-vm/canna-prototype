"use client"; 
import { useState, useEffect } from "react";
import NewItem from "../Components/NewItem";
import ItemList from "../Components/ItemList";
import { useUserAuth } from "../_utils/auth-context";
import { addItem, getItems } from "../_services/CannabuisServices";
import NavBar from "../Components/navBar";

export default function Page() {
  const { user } = useUserAuth(); // Access the user object from the authentication context

  const [items, setItems] = useState([]);
  const [setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch items only if the user is authenticated
    const fetchItems = async () => {
      try {
        if (user) {
          const items = await getItems(user.uid);
          setItems(items);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [user]);

  const handleAddItem = async (item) => {
    try {
      if (user && user.uid) {
        const itemId = await addItem(user.uid, item);
        const newItem = { id: itemId, ...item };
        setItems((prevItems) => [...prevItems, newItem]);

        // Refetch items after adding a new item
        const updatedItems = await getItems(user.uid);
        setItems(updatedItems);
      } else {
        console.error("User object or user.uid is undefined");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <main>
      <NavBar/>
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
    </main>
  );
}
