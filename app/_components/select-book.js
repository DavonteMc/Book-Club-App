"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useDatabase } from "../_utils/data_context";

export default function SelectExistingBooks({ type, onSelection }) {
  const [loading, setLoading] = useState(false);
  const { books, getBooks, setGroup, group, updateProgress } =
    useDatabase();

  const handleBookSelection = (book) => {
    if (type === "group") {
      setGroup({ ...group, book: book });
      return;
    }
    if (type === "personal") {
      updateProgress(0, null, book.book_id, true);
      onSelection("load");
      return;
    };
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="p-2 md:p-6 text-center w-full md:w-1/2">
      <div className="flex flex-col space-y-3 mb-4">
        <p className="w-full text-center text-xl font-semibold p-1">
          Select a Book:
        </p>
        {loading && <p>Loading...</p>}
        {books.map((book, index) => (
          <button
            key={book.book_id}
            value={book}
            className="w-full font-semibold text-emerald-700 px-4 py-2 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
            onClick={() => {
              handleBookSelection(book);
            }}
          >
            {book.title} <span className="font-normal">by</span> {book.author}
          </button>
        ))}
      </div>
    </div>
  );
}
