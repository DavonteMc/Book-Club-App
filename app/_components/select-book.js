"use client";
import { useState } from "react";

export default function SelectExistingBooks({ onBookSelection}) {
  const [books, setBooks] = useState([]);
  // pass these in so it can be used on the personal page as well: const { group, setGroupBookId } = useGroup();

  const handleBookChange = (e) => {
    //onBookSelection(books.find((book) => book.bookId === e.target.value));
    onBookSelection(e.target.value);
    // setBook can be used to set the selected bookId in the group context
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <select onChange={(e) => handleBookChange(e)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>
            Select Book
          </option>
          {books.map((book) => (
            <option key={book.bookId} value={book.bookId}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
