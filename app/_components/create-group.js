"use client";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useGroup } from "../_utils/group-context";
import AddBook from "./add-book";
import SelectExistingBooks from "./select-book";

export default function CreateGroup() {
  const { group, setGroupName, setGroupBookId, handleGroupCreation } =
    useGroup();
  const [bookSelectionMethod, setBookSelectionMethod] = useState("add-new");
  const [selectedBook, setSelectedBook] = useState(null);
  const handleBookSelectionMethod = (selection) => {
    setBookSelectionMethod(selection);
  };

  // add a conditional to check the size of the screen to set flex-row or flex-col
  return (
    <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg ">
      <div className="flex flex-col justify-between gap-4 mb-4">
        <div className="flex  gap-4 mb-4">
          {/* Book Selection Method Buttons*/}
          {selectedBook === null && (
            <div className="space-y-2 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg">
              <h3 className="text-lg font-bold">Book Selection</h3>
              <button
                type="button"
                onClick={() => {
                  handleBookSelectionMethod("add-new");
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
                  handleBookSelectionMethod("existing");
                }}
                className={`mr-2 shadow-neutral-700 shadow-inner ${
                  bookSelectionMethod === "existing"
                    ? "bg-neutral-700 bg-opacity-35 font-bold"
                    : ""
                }  rounded-lg p-2 px-4`}
              >
                Existing Books
              </button>
              {bookSelectionMethod === "add-new" && (
                <AddBook onBookSelection={setSelectedBook} />
              )}
              {bookSelectionMethod === "existing" && (
                <SelectExistingBooks onBookSelection={setSelectedBook} />
              )}
            </div>
          )}

          {selectedBook != null && (
            <div className="space-y-2 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg">
              {/* Back Button */}
              <div className="flex items-center mb-2">
                <button
                  className=" hover:text-neutral-900 flex items-center"
                  onClick={() => setSelectedBook(null)}
                >
                  <ChevronLeft size={18} className="mr-2" />
                </button>
                <h2 className="text-lg font-bold">Book Club Name</h2>
              </div>

              <form onSubmit={handleGroupCreation} className="space-y-2 ml-6">
                {/* Book Club Group Name */}
                <input
                  type="text"
                  value={group.name}
                  className="w-full px-2 py-1 border-neutral-700 border bg-neutral-400 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  onChange={(e) => setGroupName(e)}
                  placeholder="Enter Group Name"
                  required
                />
                {/* Book Selection */}
                <p className="text-md font-semibold">Selected Book:</p>
                <p className="text-md italic">
                  {selectedBook.title} by {selectedBook.author}
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
