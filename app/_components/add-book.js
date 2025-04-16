"use client";
import { useState } from "react";

export default function AddBook({ onBookSelection }) {
  const [book, setBook] = useState({
    bookId: "",
    title: "",
    author: "",
    numOfPages: "",
  });
  const [error, setError] = useState(false);
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

  const handleSubmit = (e) => {
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
    // Handle book submission logic here
    onBookSelection(book);
    setBook({
      bookId: "",
      title: "",
      author: "",
      numOfPages: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Book Title */}
          <p className="text-md font-semibold">Title:</p>
          <input
            type="text"
            value={book.title}
            className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleTitleChange(e)}
            placeholder="Enter Book Title"
            required
          />
          {/* Book Author */}
          <p className="text-md font-semibold">Author:</p>
          <input
            type="text"
            value={book.author}
            className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleAuthorChange(e)}
            placeholder="Enter the Author's Name"
            required
          />
          {/* Book Number of Pages */}
          <p className="text-md font-semibold">Number of Pages:</p>
          <input
            type="text"
            value={book.numOfPages}
            className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleNumOfPages(e)}
            placeholder={`Enter the Number of Pages for ${
              book.title === "" ? "the book" : book.title
            }`}
            required
          />
          {error && (
            <p className="text-red-500">Please enter a valid number of pages</p>
          )}
          <button
            type="submit"
            className="mr-2 bg-sky-300 rounded-lg p-2 place-content-center"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
