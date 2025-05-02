"use client";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useDatabase } from "../../_utils/data_context";
import AddBook from "../add-book";
import SelectExistingBooks from "../select-book";

export default function TrackNewBook() {
  const [bookSelectionMethod, setBookSelectionMethod] = useState("add-new");

  const {
    group,
    setGroup,
    createNewGroup,
    selectedBook,
    setSelectedBook,
    personalBook,
    setPersonalBook,
  } = useDatabase();

  return (
    <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg ">
      <div className="flex flex-col justify-between gap-4 mb-4">
        {/* Book Selection Method Buttons*/}
        {personalBook === null && (
          <div className="space-y-2 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg">
            <h3 className="text-lg font-bold">Book Selection</h3>
            <button
              type="button"
              onClick={() => {
                setBookSelectionMethod("add-new");
              }}
              className={`mr-2 shadow-neutral-700 shadow-inner ${
                bookSelectionMethod === "add-new"
                  ? "bg-neutral-700 bg-opacity-35 font-bold"
                  : ""
              }  rounded-lg p-2 px-4`}
            >
              Add New Book
            </button>
            <button
              type="button"
              onClick={() => {
                setBookSelectionMethod("existing");
              }}
              className={`mr-2 shadow-neutral-700 shadow-inner ${
                bookSelectionMethod === "existing"
                  ? "bg-neutral-700 bg-opacity-35 font-bold"
                  : ""
              }  rounded-lg p-2 px-4`}
            >
              Existing Books
            </button>
            {bookSelectionMethod === "add-new" && <AddBook type="personal" />}
            {bookSelectionMethod === "existing" && (
              <SelectExistingBooks type="personal" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
