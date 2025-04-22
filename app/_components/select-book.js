"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useDatabase } from "../_utils/data_context";

export default function SelectExistingBooks({ type }) {
  const [loading, setLoading] = useState(false);
  const { books, getBooks, setGroup, group, setPersonalBook, personalBook } =
    useDatabase();

  const handleBookSelection = (book) => {
    if (type === "group") {
      setGroup({ ...group, book: book });
      return;
    }
    setPersonalBook(book);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col justify-between gap-4 mb-4">
        <p className="w-full bg-slate-800 text-center rounded-lg text-lg font-semibold text-white p-1">
          Choose Books:
        </p>
        {loading && <p>Loading...</p>}
        {books.map((book, index) => (
          <button
            key={book.book_id}
            value={book}
            className="w-full bg-slate-800 rounded-lg text-white p-2 text-left hover:bg-slate-500 hover:text-black"
            onClick={() => {
              handleBookSelection(book);
            }}
          >
            {index + 1}. {book.title} by {book.author}
          </button>
        ))}
      </div>
    </div>
  );
}
