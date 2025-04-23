"use client";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "../_utils/data_context";
import AddBook from "./add-book";
import SelectExistingBooks from "./select-book";

export default function CreateGroup() {
  const [bookSelectionMethod, setBookSelectionMethod] = useState("add-new");
  const selectedStyle =
    "border-emerald-700 border-2 w-52 font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    "hover:bg-emerald-100/80 hover:text-emerald-700 hover:font-semibold transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-52 font-semibold text-emerald-700 p-1 rounded-lg " +
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
    <div className="space-y-4  p-6 mb-8">
      <div className="flex flex-col items-center justify-between gap-4 mb-4">
        <h3 className="text-3xl text-center font-bold">Book Selection</h3>
        <div className="flex mb-4">
          {/* Book Selection Method Buttons*/}
          {group.book === null && (
            <div className="space-y-2 p-2 space-x-2 mb-8 text-center rounded-lg">
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
            <div className="space-y-2 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg">
              {/* Back Button */}
              <div className="flex items-center mb-2">
                <button
                  className=" hover:text-neutral-900 flex items-center"
                  onClick={() => setGroup({ ...group, book: null })}
                >
                  <ChevronLeft size={18} className="mr-2" />
                </button>
                <h2 className="text-lg font-bold">Book Club Name</h2>
              </div>

              <form onSubmit={createNewGroup} className="space-y-2 ml-6">
                {/* Book Club Group Name */}
                <input
                  type="text"
                  value={group.name}
                  className="w-full px-2 py-1 border-neutral-700 border bg-neutral-400 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  placeholder="Enter Group Name"
                  required
                />
                {/* Book Selection */}
                <p className="text-md font-semibold">Selected Book:</p>
                <p className="text-md italic">
                  {group.book.title} by {group.book.author}
                </p>
                <button
                  type="submit"
                  className="mr-2 bg-sky-300 rounded-lg p-2 place-content-center"
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
