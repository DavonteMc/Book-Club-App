"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "../../_utils/data_context";

export default function ReadBooks({ onUpdate, books }) {
  const { updateReadBook, deleteReadBook } = useDatabase();
  const [showUserReview, setShowUserReview] = useState(false);
  const [userReviewIndex, setUserReviewIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({
    id: "",
    review: "",
    rating: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [remove, setRemove] = useState(false);

  const selectedStyle =
    "border-emerald-700 border w-2/5 md:w-1/6 h-7 text-xs md:text-sm font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    " transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border w-2/5 md:w-1/6 h-7 text-xs md:text-sm font-semibold text-emerald-700 p-1 rounded-lg " +
    "hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300";

  const handleUserReview = (index) => {
    if (
      showUserReview &&
      userReviewIndex !== null &&
      userReviewIndex !== index
    ) {
      setShowUserReview(false);
      setUserReviewIndex(index);
      setShowUserReview(true);
      return;
    }
    if (showUserReview && userReviewIndex === index) {
      setShowUserReview(false);
      setUserReviewIndex(null);
      return;
    }
    setShowUserReview(true);
    setUserReviewIndex(index);
  };

  const handleEditClick = (id, review, rating) => {
    if (remove) {
      setRemove(false);
      setEdit(true);
      return;
    }
    if (edit) {
      setEdit(false);
      return;
    }
    setEdit(true);
    setBookToEdit({
      ...bookToEdit,
      id: id,
      review: review,
      rating: rating,
    });
    return;
  };

  const handleRemoveClick = (id) => {
    if (edit) {
      setEdit(false);
      setRemove(true);
      return;
    }
    if (remove) {
      setRemove(false);
      return;
    }
    setRemove(true);
    setBookToEdit({
      ...bookToEdit,
      id: id,
    });
  };

  const handleRatingChange = (e) => {
    setError(false);
    if (!/^\d*\.?\d{0,1}$/.test(e.target.value)) {
      setError(true);
      setErrorMessage(
        "Please enter a valid rating between 0-10 with increments of 0.1"
      );
      return; // Prevent invalid characters
    }
    setBookToEdit({ ...bookToEdit, rating: e.target.value });
  };

  const handleReviewChange = (e) => {
    setBookToEdit({ ...bookToEdit, review: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      bookToEdit.rating < 0 ||
      bookToEdit.rating > 10 ||
      bookToEdit.rating === "" ||
      isNaN(parseFloat(bookToEdit.rating))
    ) {
      setError(true);
      setErrorMessage(
        "Please enter a valid rating between 0-10 with increments of 0.1"
      );
      return;
    }

    let rating = parseFloat(bookToEdit.rating);
    rating.toFixed(1);
    await updateReadBook(bookToEdit.id, bookToEdit.review, bookToEdit.rating);
    setBookToEdit({
      id: "",
      review: "",
      rating: "",
    });
    setEdit(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteReadBook(bookToEdit.id);
    setRemove(false);
    setEdit(false);
    setShowUserReview(false);
    onUpdate();
  };

  useEffect(() => {
    // This will run whenever bookToEdit changes
  }, [edit]);

  return (
    <div className="md:mt-4 h-full w-full md:w-1/2 rounded-lg py-1 md:p-3">
      <div>
        <div className="flex flex-col space-y-4">
          {books.map((review, index) => (
            <div
              key={index}
              className="relative p-2 flex flex-col shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl"
            >
              <button onClick={() => handleUserReview(index)}>
                <div className="flex justify-between items-start">
                  <div>
                    {/* Desktop button */}
                    <div className="hidden hover:text-neutral-900 text-xl md:flex items-center">
                      <p className="font-semibold md:ml-3">{review.title}</p>
                      {showUserReview && index === userReviewIndex ? (
                        <ChevronDown size={24} className="ml-1" />
                      ) : (
                        <ChevronRight size={24} className="ml-1" />
                      )}
                    </div>
                    {/* Mobile button */}
                    <div className="md:hidden hover:text-neutral-900 flex items-center">
                      <p className="font-semibold">{review.title}</p>
                    </div>
                  </div>
                </div>
              </button>
              {showUserReview && index === userReviewIndex && (
                <div className="flex flex-col mt-2">
                  <div className="flex flex-col border-y text-sm text-left py-3 md:p-5 md:text-base border-emerald-950/30 mt-1 mb-3">
                    {/* Review Details */}
                    <div className="flex flex-row w-full font-semibold justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="">
                          Rating:{" "}
                          <span className="text-emerald-800 font-bold">
                            {review.rating}
                          </span>
                          <span className="font-medium">/10</span>
                        </p>
                        <p className="">Review:</p>
                      </div>
                      <p className="text-xs md:text-sm text-wrap w-2/6 text-right text-emerald-900 whitespace-nowrap">
                        {review.date}
                      </p>
                    </div>

                    <p className="mt-2 mx-1 md:mx-6 md:py-4 text-wrap">{review.review}</p>
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="text-sm md:text-base my-2 space-x-10 w-full">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditClick(
                            review.id,
                            review.review,
                            review.rating
                          )
                        }
                        className={edit ? selectedStyle : unSelectedStyle}
                      >
                        {edit ? "Close" : "Edit"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveClick(
                            review.id
                          )}
                        className={remove ? selectedStyle : unSelectedStyle}
                      >
                        {remove ? "Close" : "Remove"}
                      </button>
                    </div>
                    {/* Form to Edit a Book Review */}
                    {edit && (
                      <form
                        onSubmit={handleSubmit}
                        className="flex-1 flex-col text-left text-sm md:text-base text-emerald-900 md:p-6"
                      >
                        {/* Book Rating 0-10 */}
                        <p className="text-md mt-4 mb-1">New Rating 0-10:</p>
                        <input
                          type="text"
                          value={bookToEdit.rating}
                          className="w-full px-2 py-1 border border-neutral-900/30 rounded-lg bg-neutral-50  mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                          onChange={(e) => handleRatingChange(e)}
                          placeholder="Enter Rating"
                          required
                        />
                        {error && (
                          <p className="text-red-500">{errorMessage}</p>
                        )}
                        {/* Book Review */}
                        <p className="text-md mt-4 mb-1">New Review:</p>
                        <textarea
                          className="w-full align-top min-h-[100px] md:min-h-[150px] p-1 md:p-3 resize-y 
                        border rounded-lg border-gray-300 
                        placeholder:text-gray-400 bg-neutral-50
                        disabled:bg-gray-900 disabled:cursor-not-allowed 
                        transition-colors
                        text-sm md:text-base leading-relaxed focus:outline-none focus:ring-2  focus:ring-emerald-800"
                          onChange={(e) => handleReviewChange(e)}
                          value={bookToEdit.review}
                          placeholder={bookToEdit.review}
                        />
                        <button
                          type="submit"
                          className="w-full shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl mb-2 mt-8 font-semibold text-emerald-700 px-4 py-2 hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
                        >
                          Update Review
                        </button>
                      </form>
                    )}
                    {/* Button to Remove a Book Review */}
                    {remove && (
                      <div className="flex-1 flex-col text-center text-wrap mt-4 md:text-base text-emerald-950">
                        <p className="md:text-lg md:font-bold pt-4">Are you sure you want to delete this review?</p>
                        <button
                          type="button"
                          className="w-3/4 md:w-1/2 shadow-lg border border-red-900/50 shadow-neutral-900/10 rounded-xl mb-6 mt-8 font-semibold text-red-700 px-4 py-2 hover:bg-red-900 hover:text-white hover:font-semibold transition duration-300"
                          onClick={handleDelete}
                        >
                          Delete Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
