"use client";
import { ChevronsLeft } from "lucide-react";
import { useState } from "react";
import { useDatabase } from "../../_utils/data_context";
import AddBook from "../add-book";
import SelectExistingBooks from "../select-book";

export default function TrackNewBook({ onTrackedBook }) {
  const [bookSelectionMethod, setBookSelectionMethod] = useState("add-new");

  const selectedStyle =
    "border-emerald-700 border-2 w-3/4 md:w-1/3 h-10 text-xs md:text-base font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    " transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-3/4 md:w-1/3 h-10 text-xs md:text-base font-semibold text-emerald-700 p-1 rounded-lg " +
    "hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300";

  return (
    <div className="mb-8 w-full mt-5">
      <div className="flex w-full flex-col items-center mb-4">
        <h2 className="w-full text-center text-xl md:text-3xl font-semibold p-1 mb-4">
          Track the Progress of a new Book
        </h2>
        <div className="w-full flex-col md:flex-row items-center md:w-1/2 space-y-2 md:space-x-3 p-2 mb-4 text-center rounded-lg">
          {/* Book Selection Method Buttons*/}
            <button
              type="button"
              onClick={() => {
                setBookSelectionMethod("add-new");
              }}
              className={
                bookSelectionMethod === "add-new"
                  ? selectedStyle
                  : unSelectedStyle
              }
            >
              Add New Book
            </button>
            <button
              type="button"
              onClick={() => {
                setBookSelectionMethod("existing");
              }}
              className={
                bookSelectionMethod === "existing"
                  ? selectedStyle
                  : unSelectedStyle
              }
            >
              Existing Books
            </button>
          </div>
          {bookSelectionMethod === "add-new" && (
            <AddBook type="personal" onAddition={onTrackedBook} />
          )}
          {bookSelectionMethod === "existing" && (
            <SelectExistingBooks type="personal" onSelection={onTrackedBook} />
          )}
      </div>
    </div>
  );
}
