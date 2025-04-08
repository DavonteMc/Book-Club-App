"use client";
import { useState, useEffect, use } from "react";
import { fetchEditions } from "../_utils/fetch-context";
import Edition from "./edition";

export default function Book({ book, onBookSelection }) {
  const [editions, setEditions] = useState([]);

  const getEditions = async (work) => {
    const data = await fetchEditions(work);
    if (!data) {
      setEditions([]);
      return;
    }
    setEditions(data);
  };

  useEffect(() => {
    getEditions(book.key);
  }, [book]);

  return (
    <div
      key={book.key}
      className=" text-white flex-col bg-slate-900 mb-3 p-3 rounded-xl"
    >
      <p className="text-lg font-bold">{book.title}</p>
      {book.author_name != undefined &&
        book.author_name != null &&
        book.author_name.length === 1 && (
          <p className="text-md">Author: {book.author_name}</p>
        )}
      {book.author_name != undefined &&
        book.author_name != null &&
        book.author_name.length > 1 && (
          <div>
            <p className="text-md">Authors:</p>
            {book.author_name.map((author) => (
              <p key={author} className="text-md italic">
                {author}
              </p>
            ))}
          </div>
        )}
      {editions != undefined && editions != null && editions.length > 0 && (
        <p className="text-md font-semibold">
          Editions Available: 
        </p>
      )}
      {editions != undefined &&
        editions != null &&
        editions.length > 0 && 
        editions.map((edition) => (
          <Edition
            key={edition.key}
            edition={edition}
            onBookSelection={onBookSelection}
            authors={book.author_name}
          />
        ))}
    </div>
  );
}

// onBookSelection({
//     id: book.isbn,
//     title: book.title,
//     author: book.author_name,
//     pages: book.num_of_pages_median,
//     coverUrl: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
//   })
