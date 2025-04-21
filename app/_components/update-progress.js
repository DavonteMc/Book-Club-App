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
    currentPage:
      progress.find((member) => member.name === user.user_metadata.full_name)
        .currentPage,
    newPage: 0,
    note: "",
  });

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
      setErrorMessage("Page number cannot exceed the total number of pages. Total: " + group.book.num_of_pages);
      setProgressUpdate({
        ...progressUpdate,
        newPage: 0,
      });
      return;
    };
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
    if (progressUpdate.note === "") {
      progressUpdate.note = null;
    }
    await updateProgress(progressUpdate.newPage, progressUpdate.note);
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
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <p>Current Page: {progressUpdate.currentPage === undefined ? 0 : progressUpdate.currentPage}</p>
        <p>Set New Current Page:</p>
        <input
          type="text"
          placeholder="Enter page number"
          className="border rounded p-2"
          onChange={handlePageChange}
          value={progressUpdate.newPage}
        />
        {pageError && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <p>Note(s) for Section:</p>
        <input
          type="textarea"
          className="border rounded p-2"
          onChange={handleNoteChange}
          value={progress.note}
        />
        <button type="submit" className="rounded-md p-2 bg-slate-700">
          Update Progress
        </button>
      </form>
    </div>
  );
}
