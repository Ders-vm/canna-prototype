// AddToCartList.js
import React from "react";

export default function AddToCartList({ items, onAddToCart }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="item-box">
          <h1> CNB: {item?.data?.CNB}</h1>
          <p>Item Name: {item?.data?.itemName}</p>
          <p>Description: {item?.data?.description}</p>
          <p>Price: ${item?.data?.price}</p>
          <p>Quantity: {item?.data?.quantity}</p>
          <button onClick={() => onAddToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
