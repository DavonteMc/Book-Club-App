"use client";
import { useState } from "react";
import { useDatabase } from "../../_utils/data_context";

export default function AddReadBook({ onAddition }) {
  const [readBook, setReadBook] = useState({
    title: "",
    review: "",
    rating: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { addReadBook } = useDatabase();
  // pass these in so it can be used on the personal page as well: const { group, setGroupBookId } = useGroup();

  const handleTitleChange = (e) => {
    setReadBook({ ...readBook, title: e.target.value });
  };

  const handleReviewChange = (e) => {
    setReadBook({ ...readBook, review: e.target.value });
  };

  const handleRatingChange = (e) => {
    setError(false);
    if (!/^\d*\.?\d{0,1}$/.test(e.target.value)) {
      setError(true);
      return; // Prevent invalid characters
    }
    setReadBook({ ...readBook, rating: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      readBook.rating < 0 ||
      readBook.rating > 10 ||
      readBook.rating === "" ||
      isNaN(parseFloat(readBook.rating))
    ) {
      setError(true);
      setErrorMessage("Please enter a valid rating between 0-10 with increments of 0.1"); 
      return;
    }

    let rating = parseFloat(readBook.rating);
    rating.toFixed(1);
    addReadBook(readBook.title, readBook.review, rating);
    setReadBook({
      title: "",
      review: "",
      rating: "",
    });
    onAddition("load");
  };

  return (
    <div className="flex flex-col p-1 md:p-6 place-self-center w-full md:w-1/2">
      <h2 className="w-full text-center text-xl md:text-3xl font-semibold p-1 mb-3 md:mb-6">
        Add a Review
      </h2>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="flex-1 flex-col text-left">
          {/* Book Title */}
          <p className="text-md font-semibold mt-4">Title:</p>
          <input
            type="text"
            value={readBook.title}
            className="w-full px-2 py-1 border border-neutral-900/30 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-emerald-800"
            onChange={(e) => handleTitleChange(e)}
            placeholder="Enter Book Title"
            required
          />
          {/* Book Review */}
          <p className="text-md font-semibold mt-4">Review:</p>
          <textarea
            className="w-full align-top min-h-[100px] md:min-h-[150px] p-3 resize-y 
            border rounded-lg border-gray-300 
            placeholder:text-gray-400 text-emerald-950 bg-neutral-50
            disabled:bg-gray-900 disabled:cursor-not-allowed 
            transition-colors
            text-base leading-relaxed focus:outline-none focus:ring-2  focus:ring-emerald-800"
            onChange={(e) => handleReviewChange(e)}
            value={readBook.review}
            placeholder="Enter review here..."
          />
          {/* Book Rating 0-10 */}
          <p className="text-md font-semibold mt-4">
            Rating 0-10:
          </p>
          <input
            type="text"
            value={readBook.rating}
            className="w-full px-2 py-1 border border-neutral-900/30 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 mb-2 focus:ring-emerald-800"
            onChange={(e) => handleRatingChange(e)}
            placeholder="Enter Rating"
            required
          />
          {error && <p className="text-red-500">{errorMessage}</p>}
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
