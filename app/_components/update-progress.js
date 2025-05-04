"use client";
import { useState } from "react";
import { useDatabase } from "../_utils/data_context";
import { useUserAuth } from "../_utils/auth-context";

export default function UpdateProgress({ onUpdate, onCompletion }) {
  const { user } = useUserAuth();
  const [pageError, setPageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { progress, updateProgress, group } = useDatabase();
  const [progressUpdate, setProgressUpdate] = useState({
    currentPage: progress.find(
      (member) => member.name === user.user_metadata.full_name
    ).currentPage,
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
    if (parseInt(e.target.value) > group.book.num_of_pages) {
      setPageError(true);
      setErrorMessage(
        "Page number cannot exceed the total number of pages of: " +
          group.book.num_of_pages
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
    setProgressUpdate({ ...progressUpdate, note: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (progressUpdate.newPage === 0) {
      setPageError(true);
      setErrorMessage("Page number cannot be 0");
      return;
    }
    if (progressUpdate.newPage === progressUpdate.currentPage) {
      setPageError(true);
      setErrorMessage("Page number cannot be the same as current page");
      return;
    }

    if (progressUpdate.note.trim() === "") {
      progressUpdate.note = null;
    }
    setLoading(true);
    await updateProgress(progressUpdate.newPage, progressUpdate.note, group.book.book_id, "group");
    setLoading(false);
    setProgressUpdate({
      currentPage: progressUpdate.newPage,
      newPage: 0,
      note: "",
    });
    onUpdate(false);
    onCompletion(true);

    console.log(
      "Updating progress\n Current Page:" +
        progress.currentPage +
        "\n New Page: " +
        progressUpdate.newPage +
        "\nNote: " +
        progressUpdate.note
    );
  };

  return (
    <div className="w-full  md:w-1/3">
      <form className="flex w-full flex-col gap-2 mt-6 shadow-lg border p-5 border-neutral-900/30 shadow-neutral-900/10 rounded-xl" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-5">
          <p>
            Current Page:{" "}
            <span className="font-bold">
              {progressUpdate.currentPage === undefined
                ? 0
                : progressUpdate.currentPage}
            </span>
          </p>
          <p className="text-left md:text-center">Set New Current Page:</p>
          <input
            type="text"
            placeholder="Enter page number"
            className="border border-emerald-950 rounded-lg pb-1 md:w-14 text-center text-emerald-950 bg-neutral-50"
            onChange={handlePageChange}
            value={progressUpdate.newPage}
          />
        </div>
        {pageError && <p className="text-red-500/80">{errorMessage}</p>}
        <p>Note(s) for Section:</p>
        <textarea
          className="w-full align-top min-h-[100px] md:min-h-[150px] p-3 resize-y 
            border rounded-lg border-gray-300 
            placeholder:text-gray-400 text-emerald-950 bg-neutral-50
            disabled:bg-gray-900 disabled:cursor-not-allowed 
            transition-colors
            text-base leading-relaxed"
          onChange={handleNoteChange}
          value={progress.note}
          placeholder="Enter notes here..."
        />
        <button
          type={loading ? "button" : "submit"}
          className="mt-3 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl font-semibold text-emerald-700 px-4 py-2 hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
        >
          Update Progress
        </button>
        {loading && <p className="text-center text-lg">Updating...</p>}
      </form>
    </div>
  );
}
