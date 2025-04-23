"use client";
import { ChevronsLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "../_utils/data_context";
import AddBook from "./add-book";
import SelectExistingBooks from "./select-book";

export default function CreateGroup() {
  const [bookSelectionMethod, setBookSelectionMethod] = useState("add-new");
  const selectedStyle =
    "border-emerald-700 border-2 w-2/5 text-xs md:text-base mx-1 font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    " transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-2/5 text-xs md:text-base mx-1 font-semibold text-emerald-700 p-1 rounded-lg " +
    "hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300";

  const { group, setGroup, createNewGroup } = useDatabase();

  useEffect(() => {
    setGroup({
      code: "",
      name: "",
      book: null,
    });
  }, []);

  return (
    <div className="mb-8 w-full">
      <div className="flex w-full flex-col items-center mb-4">
        <h3 className="text-3xl text-center font-bold">Book Selection</h3>
        <div className="flex mb-4">
          {/* Book Selection Method Buttons*/}
          {group.book === null && (
            <div className="w-full space-y-2 p-2 mb-8 text-center rounded-lg">
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
              {bookSelectionMethod === "add-new" && <AddBook type="group" />}
              {bookSelectionMethod === "existing" && (
                <SelectExistingBooks type="group" />
              )}
            </div>
          )}

          {group.book != null && (
            <div className="py-6 mb-8 rounded-lg">
              {/* Book Selection */}
              <p className="text-md md:text-xl text-center font-semibold">
                Selected Book:
              </p>
              <p className="text-md md:text-xl text-center italic">
                {group.book.title} by {group.book.author}
              </p>

              {/* Back Button */}
              <div className="flex flex-col items-center ">
                <button
                  className="flex flex-row px-2 mb-5 mt-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                  onClick={() => setGroup({ ...group, book: null })}
                >
                  <ChevronsLeft size={24} className="mr-1" />
                  Select a Different Book
                </button>
              </div>

              <form
                onSubmit={createNewGroup}
                className="flex flex-col items-center"
              >
                <p className="text-lg text-left font-bold mt-10">
                  Book Club Name:
                </p>
                {/* Book Club Group Name */}
                <input
                  type="text"
                  value={group.name}
                  className="w-full px-2 py-1 mb-5 border-neutral-700 border bg-neutral-400 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  placeholder="Enter Group Name"
                  required
                />

                <button
                  type="submit"
                  className="w-full p-2 text-base mt-10 font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Create Group
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
