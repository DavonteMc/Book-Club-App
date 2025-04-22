"use client";
import { useState, useEffect } from "react";
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
      return;
    }
    if (progressUpdate.note.trim() === "") {
      progressUpdate.note = null;
    }
    setLoading(true);
    await updateProgress(progressUpdate.newPage, progressUpdate.note);
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
    <div >
      <form className="flex w-full flex-col gap-2 mt-6" onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <p>
            Current Page:{" "}
            <span className="font-bold">{progressUpdate.currentPage === undefined
              ? 0
              : progressUpdate.currentPage}</span>
          </p>
          <p className="text-center">Set New Current Page:</p>
          <input
            type="text"
            placeholder="Enter page number"
            className="border border-emerald-950 rounded pb-1 w-14 text-center text-emerald-950 bg-neutral-50"
            onChange={handlePageChange}
            value={progressUpdate.newPage}
          />
        </div>
        {pageError && <p className="text-red-500/80">{errorMessage}</p>}
        <p>Note(s) for Section:</p>
        <input
          type="textarea"
          className="border border-emerald-950 p-3 rounded min-h-5 max-h-10 text-emerald-950 bg-neutral-50"
          onChange={handleNoteChange}
          value={progress.note}
        />
        <button type={loading ? "button" : "submit"} className="mt-3 border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300">
          Update Progress
        </button>
        {loading && <p className="text-center text-lg">Updating...</p>}
      </form>
    </div>
  );
}
