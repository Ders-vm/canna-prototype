import React from "react";

export default function CartItemList({ items, onSellItem, onQuantityChange }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="item-box">
          <h1>CNB: {item?.data?.CNB}</h1>
          <p>Item Name: {item?.data?.itemName}</p>
          <p>Description: {item?.data?.description}</p>
          <p>Price: ${item?.data?.price}</p>
          <p>Quantity in Cart: <input
            type="number"
            min="1"
            max={item?.data?.quantity}
            value={item.sellQuantity}
            onChange={e => onQuantityChange(item.id, parseInt(e.target.value))}
          /></p>
          
          <button onClick={() => onSellItem(item.id, item.sellQuantity)}>Sell</button>
          <hr />
        </div>
      ))}
    </div>
  );
}