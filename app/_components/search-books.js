"use client";

import { useState, useEffect } from "react";
import { fetchBooks } from "../_utils/fetch-context";

export default function SearchBooks({ onCreateGroup }) {
  const [selection, setSelection] = useState(null);
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [group, setGroup] = useState({
    name: "",
    book: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Event Handlers

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSelection = (e) => {
    setSearchBy(e);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchBy === "") {
      alert("Please select a search type");
      return;
    }
    if (searchTerm === "") {
      alert("Please enter a Title or Author");
      return;
    }

    setLoading(true);
    const data = await fetchBooks("/works/OL20716197W", searchBy);
    setLoading(false);
    if (!data) {
      setNumFound(0);
      setResults([]);
      setError("no-results");
      return;
    }
    setError("");
    setNumFound(data.num_found);
    setResults(data.docs);
  };

  const handleBookSelection = (e) => {
    setSelection(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selection === null || selection === undefined) {
      setError("no-selection");
      return;
    }
    setGroup({ ...group, book: selection.key });
  };

  useEffect(() => {}, [selection]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          {/* Group Name */}

          <div className="flex gap-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                searchBy === "title"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSearchSelection("title")}
            >
              Title
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                searchBy === "author"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSearchSelection("author")}
            >
              Author
            </button>
          </div>
          <input
            type="text"
            value={searchTerm}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearchChange(e)}
            placeholder="Enter Book Title or Author"
            required
          />
          <button type="submit">Search</button>
          {loading && <p className="text-xl font-semibold">Loading...</p>}
          {error === "no-results" && (
            <p className="font-semibold">No results found</p>
          )}
        </form>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Book selection */}
          <div>
            {results.length > 0 && (
              <div>
                <p>
                  <span className="font-bold">{numFound}</span> Books Found for{" "}
                  <span className="font-bold">{searchTerm}</span>
                </p>
                <select
                  value={group.book}
                  onChange={(e) => handleBookSelection(e)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option disabled>Book</option>
                  {results.map((book) => (
                    <option key={book.key} value={book.key}>
                      {book.title} by {book.author_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {selection !== null && (
            <p className="p-2 ml-2 w-1/3 font-bold text-lg">
              {selection}
            </p>
          )}
          {/* Group Name */}
          <input
            type="text"
            value={group.name}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleGroupNameChange(e)}
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
