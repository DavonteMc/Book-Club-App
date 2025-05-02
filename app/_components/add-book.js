"use client";
import { useState } from "react";
import { useDatabase } from "../_utils/data_context";

export default function AddBook({ type, onAddition }) {
  const [book, setBook] = useState({
    bookId: "",
    title: "",
    author: "",
    numOfPages: "",
  });
  const [error, setError] = useState(false);
  const { addBook, setSelectedBook } = useDatabase();
  // pass these in so it can be used on the personal page as well: const { group, setGroupBookId } = useGroup();

  const handleTitleChange = (e) => {
    setBook({ ...book, title: e.target.value });
  };

  const handleAuthorChange = (e) => {
    setBook({ ...book, author: e.target.value });
  };

  const handleNumOfPages = (e) => {
    let pages = parseInt(e.target.value);
    if (isNaN(pages) || pages < 0) {
      setError(true);
      setBook({ ...book, numOfPages: "" });
      return;
    }
    setBook({ ...book, numOfPages: pages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book.title === "") {
      alert("Please enter a title");
      return;
    }
    if (book.author === "") {
      alert("Please enter an author");
      return;
    }
    if (book.numOfPages <= 0) {
      alert("Please enter a valid number of pages");
      return;
    }

    addBook(book, type);
    onAddition("load");
    setBook({
      bookId: "",
      title: "",
      author: "",
      numOfPages: 0,
    });
  };

  return (
    <div className="p-1 md:p-6 rounded-lg items-center w-full md:w-1/2">
      <p className="w-full text-center text-xl font-semibold p-1">
        Add a Book:
      </p>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="flex-1 flex-col text-left">
          {/* Book Title */}
          <p className="text-md font-semibold mt-4">Title:</p>
          <input
            type="text"
            value={book.title}
            className="w-full px-2 py-1 border border-neutral-900/30 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-emerald-800"
            onChange={(e) => handleTitleChange(e)}
            placeholder="Enter Book Title"
            required
          />
          {/* Book Author */}
          <p className="text-md font-semibold mt-4">Author:</p>
          <input
            type="text"
            value={book.author}
            className="w-full px-2 py-1 border border-neutral-900/30 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-emerald-800"
            onChange={(e) => handleAuthorChange(e)}
            placeholder="Enter the Author's Name"
            required
          />
          {/* Book Number of Pages */}
          <p className="text-md font-semibold mt-4">Number of Pages:</p>
          <input
            type="text"
            value={book.numOfPages}
            className="w-full px-2 py-1 border border-neutral-900/30 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 mb-2 focus:ring-emerald-800"
            onChange={(e) => handleNumOfPages(e)}
            placeholder="Enter Number of Pages"
            required
          />
          {error && (
            <p className="text-red-500">Please enter a valid number of pages</p>
          )}
          <button
            type="submit"
            className="w-full shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl mt-8 font-semibold text-emerald-700 px-4 py-2 hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
