"use client";
import { useState, useEffect, use } from "react";
import { useDatabase } from "../_utils/data_context";
import PersonalProgress from "./personal-progress";

export default function LoadBooks() {
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(false);
  const { personalBooks, getPersonalBooks, setPersonalBook } = useDatabase();
  const [updateProcessed, setUpdateProcessed] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setError(false);
        const fetchResult = await getPersonalBooks();
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
      <h2 className="w-full text-center text-xl md:text-3xl font-semibold p-1 mb-3 md:mb-6">
        Tracked Books
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>Unable to Fetch Books</p>}
      {!loading && !error && personalBooks.length === 0 && (
        <p>You are not currently tracking any books</p>
      )}
      {!loading &&
        !error &&
        personalBooks.length > 0 &&
        personalBooks.map((book, index) => (
          <PersonalProgress
            key={index}
            book={book}
            onCompletion={setUpdateProcessed}
          />
        ))}
    </div>
  );
}
