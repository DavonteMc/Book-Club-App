"use client";

import { useState } from "react";

export default function NewGroup({ onCreateGroup }) {
  const [group, setGroup] = useState({
    name: "",
    groupCode: "",
    book: "",
  });
  const [results, setResults] = useState([]);

  const generateGroupCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  // Quantity Button Functions
  const increment = (e) => {
    e.preventDefault();
    if (item.quantity < 20) {
      setItem({ ...item, quantity: item.quantity + 1 });
    }
  };

  const decrement = (e) => {
    e.preventDefault();
    if (item.quantity !== 1) {
      setItem({ ...item, quantity: item.quantity - 1 });
    }
  };

  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.category === "") {
      noCategorySel = true;
    } else {
      onAddItem({ ...item, quantity: item.quantity });
    }
    setItem({ name: "", quantity: 1, category: "" });
  };

  const handleNameChange = (e) => {
    setItem({ ...group, name: e.target.value });
  };

  const handleBookChange = (e) => {
    setItem({ ...group, book: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Create Group</h2>

      <form onSubmit={handleSubmit} className="flex justify-center">
        <div>
          {/* Group Name */}
          <div>
            <input
              type="text"
              value={group.name}
              onChange={(e) => handleNameChange(e)}
              placeholder="Enter Group Name"
              required
            />
          </div>
          
          {/* Book selection */}
          <div>
            {results.length > 0 && (
              <select value={group.book} onChange={(e) => handleBookChange(e)}>
                <option value="" disabled>
                  Book
                </option>
                {results.map((book) => (
                  <option key={index} value={book.key}>
                    {book.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Quantity Button */}
          <div className="flex flex-row justify-center p-2 mb-2 mt-2 items-center w-full h-1/2 bg-slate-900 rounded-lg">
            <p className="p-2 ml-2 w-1/3 font-bold text-lg">{item.quantity}</p>
            <div className="flex flex-row flex-grow w-2/3">
              <button
                onClick={(e) => decrement(e)}
                className={`flex-grow mr-1 font-bold text-xl rounded-lg 
                                      ${
                                        item.quantity === 1
                                          ? "bg-slate-500 text-white disabled"
                                          : "text-black bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-400"
                                      }`}
              >
                -
              </button>
              <button
                onClick={(e) => increment(e)}
                className={`flex-grow font-bold text-xl rounded-lg 
                                      ${
                                        item.quantity === 20
                                          ? "bg-slate-500 text-white disabled"
                                          : "text-black bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-400"
                                      }`}
              >
                +
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-1 w-full mt-2 font-bold text-lg rounded-lg
        text-black bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-400"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
