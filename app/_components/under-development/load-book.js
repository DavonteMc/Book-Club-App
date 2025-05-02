"use client";
import { useState, useEffect, use } from "react";
import { useDatabase } from "../../_utils/data_context";

export default function LoadBook() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const { personalBooks, getPersonalBooks, setPersonalBook } =
    useDatabase();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getPersonalBooks();
      setResult(res);
    };
    setLoading(true);
    fetchBooks();
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 mb-4 items-center">
        <h2 className="w-full text-center text-4xl font-semibold  p-1">
          Choose Book
        </h2>
        {loading && <p>Loading...</p>}
        {!loading && result === -1 && <p>Unable to Fetch Books</p>}
        {!loading && result === 0 && <p>You are not currently tracking any books</p>}
        {!loading && result === 1 &&
          personalBooks.map((book, index) => (
            <button
              key={index}
              className="w-4/5 md:w-1/3 border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
              onClick={() => {
                setPersonalBook(book);
              }}
            >
              {index + 1}. {book.title} <span className="font-normal">by</span>{" "}
              {book.author}
            </button>
          ))}
      </div>
    </div>
  );
}
