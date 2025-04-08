"use client";

import { useState, useEffect } from "react";
import { fetchBooks } from "../_utils/fetch-context";
import Book from "../_components/book";

export default function SearchBooks({
  onSelection,
  selectedBook,
  onSearch,
  showResults,
}) {
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

  const handleSearchSelection = (searchSelection) => {
    setSearchBy(searchSelection);
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
    onSearch(true);
    const data = await fetchBooks(searchTerm, searchBy);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBook === null || selectedBook === undefined) {
      setError("no-selection");
      return;
    }
    setGroup({ ...group, book: selectedBook.key });
  };

  useEffect(() => {}, [selectedBook]);

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

        {/* Book selection */}
        {showResults && (
          <div>
            {results.length > 0 && (
              <div className="space-y-2">
                <p>
                  <span className="font-bold">{numFound}</span> Books found with
                  the{" "}
                  <span className="font-semibold capitalize">{searchBy}</span>{" "}
                  of <span className="font-bold">{searchTerm}</span>
                </p>
                <p>Displaying up to 15</p>
                <div>
                  {results.length <= 15 &&
                    results.map((book) => (
                      <Book
                        key={book.key}
                        book={book}
                        onBookSelection={onSelection}
                      />
                    ))}
                  {results.length > 15 &&
                    results
                      .slice(0, 15)
                      .map((book) => (
                        <Book
                          key={book.key}
                          book={book}
                          onBookSelection={onSelection}
                        />
                      ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
