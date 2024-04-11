import Item from './Item';        

export default function ItemList({ items }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.id}>
          <Item {...item.data} /> {/* Use item.data to access item properties */}
        </div>
      ))}
    </div>
  );
}
