// NewItem.js
import { useState } from 'react';

export default function NewItem({ onAddItem }) {
    const [CNB, setCNB] = useState('');
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [cost, setCost] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!CNB.trim() || !itemName.trim() || !description.trim() || !price || !cost || !quantity) {
            alert('Please fill in all fields');
            return;
        }
        const newItem = {
            CNB: CNB.trim(),
            itemName: itemName.trim(),
            description: description.trim(),
            price: parseFloat(price),
            cost: parseFloat(cost),
            quantity: parseInt(quantity)
        };
        onAddItem(newItem);
        setCNB('');
        setItemName('');
        setDescription('');
        setPrice('');
        setCost('');
        setQuantity('');
    };

    return (
        <div className="border border-gray-300 rounded-lg p-5">
            <form onSubmit={handleSubmit} className="w-fit mx-auto">
                <div className="mb-4">
                    <label className="block">
                        CNB (PK):
                        <input 
                            type="text" 
                            value={CNB} 
                            onChange={(e) => setCNB(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Item Name:
                        <input 
                            type="text" 
                            value={itemName} 
                            onChange={(e) => setItemName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Description:
                        <input 
                            type="text" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Price $:
                        <input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Cost $:
                        <input 
                            type="number" 
                            value={cost} 
                            onChange={(e) => setCost(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Quantity:
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded border-2 border-teal-600">
                    Submit
                </button>
            </form>
        </div>
    );
}
