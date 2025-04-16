"use client";
import { useState } from "react";

export default function UpdateProgress({ progress, onProgressChange, onUpdate }) {
  const [pageError, setPageError] = useState(false);

  const handlePageChange = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      setPageError(true);
      onProgressChange({ ...progress, currentPage: 0 });
      return;
    }
    setPageError(false);
    onProgressChange({ ...progress, currentPage: parseInt(e.target.value) });
  };
  const handleNoteChange = (e) => {
    onProgressChange({ ...progress, note: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (progress.currentPage === 0) {
      setPageError(true);
      return;
    }
    onUpdate(false);
    console.log(
      "Updating progress\n Current Page:" +
        progress.currentPage +
        "\nNote: " +
        progress.note
    );
  };
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <p>Current Page: {progress.currentPage}</p>
        <p>Set New Current Page:</p>
        <input
          type="text"
          placeholder="Enter page number"
          className="border rounded p-2"
          onChange={handlePageChange}
          value={progress.currentPage}
        />
        {pageError && (
          <p className="text-red-500">Please enter a valid page number</p>
        )}
        <p>Note(s) for Section:</p>
        <input
          type="textarea"
          className="border rounded p-2"
          onChange={handleNoteChange}
          value={progress.note}
        />
        <button type="submit" className="rounded-md p-2 bg-slate-700">Update Progress</button>
      </form>
    </div>
  );
}
