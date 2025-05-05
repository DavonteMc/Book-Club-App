"use client";
import { useState } from "react";
import { useDatabase } from "../_utils/data_context";

export default function UpdatePersonalProgress({
  book,
  onUpdate,
  onCompletion,
}) {
  const [pageError, setPageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { updateProgress } = useDatabase();
  const [progressUpdate, setProgressUpdate] = useState({
    currentPage: book.currentPage,
    newPage: 0,
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePageChange = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      setPageError(true);
      setErrorMessage("Please enter a valid page number");
      setProgressUpdate({
        ...progressUpdate,
        newPage: 0,
      });
      return;
    }
    if (parseInt(e.target.value) > book.num_of_pages) {
      setPageError(true);
      setErrorMessage(
        "Page number cannot exceed the total number of pages of: " +
          book.num_of_pages
      );
      setProgressUpdate({
        ...progressUpdate,
        newPage: 0,
      });
      return;
    }
    setPageError(false);
    setProgressUpdate({ ...progressUpdate, newPage: parseInt(e.target.value) });
  };

  const handleNoteChange = (e) => {
    setProgressUpdate({ ...progressUpdate, note: e.target.value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (progressUpdate.newPage === 0) {
      setPageError(true);
      return;
    }
    setLoading(true);
    await updateProgress(
      progressUpdate.newPage,
      progressUpdate.note === "" ||
        progressUpdate.note === "   " ||
        progressUpdate.note.trim() === ""
        ? null
        : progressUpdate.note,
      book.book_id,
      "personal"
    );
    setLoading(false);
    setProgressUpdate({
      currentPage: progressUpdate.newPage,
      newPage: 0,
      note: " ",
    });
    onUpdate(false);
    onCompletion(true);

    console.log(
      "Updating progress\n Current Page:" +
        book.currentPage +
        "\n New Page: " +
        progressUpdate.newPage +
        "\nNote: " +
        progressUpdate.note
    );
  };

  return (
    <div className="w-full md:w-1/2">
      <form className="flex w-full flex-col gap-2 mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col text-left gap-5">
          <p>
            Current Page:{" "}
            <span className="font-bold">
              {progressUpdate.currentPage === undefined
                ? 0
                : progressUpdate.currentPage}
            </span>
          </p>
          <div className="flex flex-row items-center">
            <p className="flex-grow">Set New Current Page:</p>
            <input
              type="text"
              placeholder="Enter page number"
              className="border border-emerald-950 rounded-lg pb-1 w-10 md:w-14 text-center text-emerald-950 bg-neutral-50"
              onChange={handlePageChange}
              value={progressUpdate.newPage}
            />
          </div>
        </div>
        {pageError && <p className="text-red-500/80">{errorMessage}</p>}
        <p className="text-left">Note(s) for Section:</p>
        <textarea
          className="w-full align-top min-h-[100px] md:min-h-[150px] p-3 resize-y 
            border rounded-lg border-gray-300 
            placeholder:text-gray-400 text-emerald-950 bg-neutral-50
            disabled:bg-gray-900 disabled:cursor-not-allowed 
            transition-colors
            text-base leading-relaxed"
          onChange={handleNoteChange}
          value={progressUpdate.note}
          placeholder="Enter notes here..."
        />
        <button
          type={loading ? "button" : "submit"}
          className="mt-3 border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
        >
          Update Progress
        </button>
        {loading && <p className="text-center text-lg">Updating...</p>}
      </form>
    </div>
  );
}
