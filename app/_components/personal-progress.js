"use client";
import { useState } from "react";
import ProgressTracker from "./progress-tracker";
import UpdatePersonalProgress from "./update-personal-progress";
import PersonalNotes from "./personal-notes";

export default function PersonalProgress({ book, onCompletion }) {
  const [update, setUpdate] = useState(false);
  const [notes, setNotes] = useState(false);

  const selectedStyle = "text-white bg-emerald-900 ";

  const unSelectedStyle =
    "text-emerald-700 hover:bg-emerald-900 hover:text-white hover:font-semibold ";

  const generateProgress = (currentPage) => {
    if (
      currentPage === 0 ||
      currentPage === null ||
      currentPage === undefined
    ) {
      return 0;
    }
    const progressValue = (currentPage / book.num_of_pages) * 100;
    return Math.round(progressValue);
  };

  const handleUpdateClick = () => {
    if (notes) {
      setNotes(false);
      setUpdate(true);
      return;
    }
    if (update) {
      setUpdate(false);
      setNotes(false);
      return;
    }
    setUpdate(true);
  };

  const handleNotesClick = () => {
    if (update) {
      setUpdate(false);
      setNotes(true);
      return;
    }
    if (notes) {
      setNotes(false);
      setUpdate(false);
      return;
    }
    setNotes(true);
  };

  return (
    <div className="mb-8 w-full md:w-4/6 flex flex-col items-center py-4 px-3 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl">
      <h3 className="w-full text-center text-base md:text-2xl font-medium py-2 ">
        Progress on:{" "}
        <span className="font-semibold text-emerald-700 ">{book.title}</span>{" "}
        <span className="text-sm md:text-xl">by</span>{" "}
        <span className="font-semibold text-emerald-700">{book.author}</span>
      </h3>
      <div className="flex flex-col w-full h-full mb-5 text-center items-center">
        <ProgressTracker
          page={book.currentPage}
          value={generateProgress(book.currentPage)}
          total={book.num_of_pages}
        />
      </div>
      {/* Update and Notes Buttons - Desktop*/}
      <div className="w-full text-center text-sm space-x-4 hidden md:block">
        <button
          type="button"
          className={`w-1/6 h-10 border-emerald-700 border-2 font-semibold p-1 rounded-lg transition duration-300 ${
            update ? selectedStyle : unSelectedStyle
          }`}
          onClick={handleUpdateClick}
        >
          {update ? "Close" : "Update Progress"}
        </button>
        <button
          type="button"
          className={`w-1/6 h-10 border-emerald-700 border-2 font-semibold p-1 rounded-lg transition duration-300 ${
            notes ? selectedStyle : unSelectedStyle
          }`}
          onClick={handleNotesClick}
        >
          {notes ? "Close" : "View Notes"}
        </button>
      </div>
      {/* Update and Notes Buttons - Mobile*/}
      <div className="w-full flex flex-col text-center space-y-3 items-center md:hidden">
        <button
          type="button"
          className={`w-4/5 text-xs h-7 border-emerald-700 border-2 font-semibold px-1 rounded-lg transition duration-300 ${
            update ? selectedStyle : unSelectedStyle
          }`}
          onClick={handleUpdateClick}
        >
          {update ? "Close" : "Update Progress"}
        </button>
        <button
          type="button"
          className={`w-4/5 text-xs h-7 border-emerald-700 border-2 font-semibold px-1 rounded-lg transition duration-300 ${
            notes ? selectedStyle : unSelectedStyle
          }`}
          onClick={handleNotesClick}
        >
          {notes ? "Close" : "View Notes"}
        </button>
      </div>
      {update && (
        <UpdatePersonalProgress
          book={book}
          onCompletion={onCompletion}
          onUpdate={setUpdate}
        />
      )}
      {notes && <PersonalNotes book={book} />}
    </div>
  );
}
