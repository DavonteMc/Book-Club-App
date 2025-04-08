"use client";

import { useState, useEffect } from "react";

export default function CreateGroup({ onGroupNameChange, onGroupCreation, selectedBook, currentGroup }) {
  const [error, setError] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <form onSubmit={onGroupCreation} className="space-y-2">
          {/* Book selection */}
          {selectedBook != null && selectedBook != undefined && (
            <p>
              Selected Book: <br></br>
              <span className="font-bold">{selectedBook.title}</span> by{" "}
              <span className="italic">{selectedBook.author}</span>
              <br></br>
              Number of Pages:{" "}
              <span className="italic">{selectedBook.number_of_pages}</span>
            </p>
          )}
          {/* Group Name */}
          <input
            type="text"
            value={currentGroup.name}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onGroupNameChange(e)}
            placeholder="Enter Group Name"
            required
          />
          <button type="submit">Create Group</button>
          {error === "no-selection" && (
            <p className="font-semibold">Please Select a Book</p>
          )}
        </form>
      </div>
    </div>
  );
}
