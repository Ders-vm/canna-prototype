export default function ItemList({ items }) {
    return (
        <div>
            {items.map((item) => (
                <div key={item.id} className="item-box" style={{ border: '2px solid teal' }}>
                    <h1> CNB: {item?.data?.CNB}</h1>
                    <p>Item Name: {item?.data?.itemName}</p>
                    <p>Description: {item?.data?.description}</p>
                    <p>Price: ${item?.data?.price}</p>
                    <p>Cost: ${item?.data?.cost}</p>
                    <p>Quantity: {item?.data?.quantity}</p>
                </div>
            ))}
        </div>
    );
}
