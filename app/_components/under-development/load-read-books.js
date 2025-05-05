"use client";
import { useState, useEffect } from "react";
import { useDatabase } from "../../_utils/data_context";
import ReadBooks from "./read-books";

export default function LoadReadBooks() {
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(false);
  const { readBooks, getReadBooks } = useDatabase();
  const [updateProcessed, setUpdateProcessed] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setError(false);
        const fetchResult = await getReadBooks();
        if (!fetchResult) setError(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
    setUpdateProcessed(false);
  }, [updateProcessed]); // Empty dependency array to run once on mount

  return (
    <div className="flex w-full flex-col justify-between gap-4 mt-5 items-center">
      <h2 className="w-full text-center text-xl md:text-3xl font-semibold p-1">
        Book Reviews
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>Unable to Fetch Books</p>}
      {!loading && !error && readBooks.length === 0 && (
        <p>You don't have any reviews for books you have read</p>
      )}
      {!loading && !error && readBooks.length > 0 && (
        <ReadBooks books={readBooks} />
      )}
    </div>
  );
}
