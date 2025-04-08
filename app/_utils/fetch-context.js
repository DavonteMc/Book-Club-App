"use client";

import { useContext, createContext, useState, useEffect } from "react";

const BookContext = createContext();

export async function fetchBooks(searchTerm, searchType) {
  // searchTerm needs to be in the form of a string with + replacing spaces
  searchTerm.trim().replace(/\s/g, "+");

  if (searchTerm === "") {
    return null;
  }
  try {
    if (searchType === "title") {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}`
      );
      const data = await response.json();
      return data; // This will be a an object with "start": , "num_found": , "docs": [{ }] link: https://openlibrary.org/dev/docs/api/search
    }
    if (searchType === "author") {
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${searchTerm}`
      );
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

export async function fetchEditions(work) {
  if (work === "") {
    return null;
  }
  try {
    const response = await fetch(
      `https://openlibrary.org${work}/editions.json`
    );
    const data = await response.json();
    return data.entries;
  } catch (error) {
    console.error("Error fetching editions:", error);
    return null;
  }
}


// book covers can be accessed using the cover id in an images src
// `https://covers.openlibrary.org/b/id/${}-M.jpg`
// <img src="https://covers.openlibrary.org/b/$key/$value-$size.jpg" />
// where key can be id cover_id in the fetched response
// and value is the cover id
// <img src="https://covers.openlibrary.org/b/id/240727-S.jpg" />
// S is for small, M is for medium, L is for large
