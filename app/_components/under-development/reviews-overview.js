"use client";
import { useState } from "react";
import AddReadBook from "./add-read-book";
import LoadReadBooks from "./load-read-books";

export default function Reviews() {
  const [bookSelectionMethod, setBookSelectionMethod] = useState("none");

  const selectedStyle =
    "border-emerald-700 border-2 w-2/5 md:w-1/4 h-10 text-base md:text-xl font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    " transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-2/5 md:w-1/4 h-10 text-base md:text-xl font-semibold text-emerald-700 p-1 rounded-lg " +
    "hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300";


  return (
    <div className="mb-8 w-full">
      <div className="flex w-full flex-col items-center mb-4">
        <h3 className="text-3xl md:text-5xl text-center mb-5 font-bold">
          Reviews
          <p className="text-center text-sm md:text-lg mt-2 text-emerald-950/70 font-semibold">
            Write personal reviews of the books you read. You can either load an
            existing review or write a new one.
          </p>
        </h3>

        {/* Book Selection Method Buttons*/}
        <div className="w-full flex-col p-1 mb-8 text-center rounded-lg">
          <div className="w-full space-x-6 items-center text-center">
            <button
              type="button"
              onClick={() => {
                setBookSelectionMethod("load");
              }}
              className={
                bookSelectionMethod === "load" ? selectedStyle : unSelectedStyle
              }
            >
              Load
            </button>
            <button
              type="button"
              onClick={() => {
                setBookSelectionMethod("new");
              }}
              className={
                bookSelectionMethod === "new" ? selectedStyle : unSelectedStyle
              }
            >
              Add New
            </button>
          </div>
          <div className="border-b mt-7 border-emerald-950"></div>
          {bookSelectionMethod === "load" && <LoadReadBooks />}
          {bookSelectionMethod === "new" && <AddReadBook onAddition={setBookSelectionMethod}/>}
        </div>
      </div>
    </div>
  );
}
