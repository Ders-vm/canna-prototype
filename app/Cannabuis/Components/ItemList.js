import Item from './Item';        

export default function ItemList({ items }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 bg-black">
            {items.map((item) => (
                <div key={item.id} className="item-box"> {/* Added className */}
                    <Item {...item} />
                </div>
            ))}
        </div>
    );
}
