export default function Item({ CNB, itemName, description, price, cost, quantity }) {
    return (
      <section style={{ border: '2px solid teal' }} className="p-2 m-2">
        <h1 className="text-2xl font-bold">{CNB}</h1>
        <p>Item Name: {itemName}</p>
        <p>Description: {description}</p>
        <p>Price: ${price}</p>
        <p>Cost: ${cost}</p>
        <p>Quantity: {quantity}</p>
      </section>
    );
  }
  