"use client";
import { ChevronsLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "../../_utils/data_context";
import TrackNewBook from "./track-book";
import LoadBook from "./load-book";

export default function PersonalProgress() {
  const [bookSelectionMethod, setBookSelectionMethod] = useState("none");
  const {
    group,
    setGroup,
    createNewGroup,
    personalBook,
    setPersonalBook,
    progress,
  } = useDatabase();
  const selectedStyle =
    "border-emerald-700 border-2 w-2/5 text-xs md:text-base mx-1 font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    " transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-2/5 text-xs md:text-base mx-1 font-semibold text-emerald-700 p-1 rounded-lg " +
    "hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300";

  const generateProgress = (currentPage) => {
    if (
      currentPage === 0 ||
      currentPage === null ||
      currentPage === undefined
    ) {
      return 0;
    }
    const progressValue = (currentPage / personalBook.num_of_pages) * 100;
    return Math.round(progressValue);
  };

  return (
    <div className="mb-8 w-full">
      <div className="flex w-full flex-col items-center mb-4">
        <h3 className="text-3xl text-center font-bold">
          Load or Track a new Book's Progress
        </h3>
        <div className="flex mb-4">
          {/* Book Selection Method Buttons*/}
          {personalBook === null && (
            <div className="w-full space-y-2 p-2 mb-8 text-center rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setBookSelectionMethod("load");
                }}
                className={
                  bookSelectionMethod === "load"
                    ? selectedStyle
                    : unSelectedStyle
                }
              >
                Load Book
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookSelectionMethod("new");
                }}
                className={
                  bookSelectionMethod === "new"
                    ? selectedStyle
                    : unSelectedStyle
                }
              >
                Track a New Book
              </button>
              {bookSelectionMethod === "load" && <LoadBook />}
              {bookSelectionMethod === "new" && <TrackNewBook />}
            </div>
          )}

          {personalBook !== null && (
            <div className="py-6 mb-8 rounded-lg">
              {progress.map((member, index) => (
                <ProgressTracker
                  key={index}
                  name={member.name}
                  page={member.currentPage}
                  value={generateProgress(member.currentPage)}
                  total={personalBook.num_of_pages}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
