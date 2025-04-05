"use client";


import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";

import BookClub from "./book-club";
import PersonalPage from "./personal";


export default function HomePage() {
  const [page, setPage] = useState("book-club");
  const { user, googleSignIn } = useUserAuth();

  const handlePageChange = () => {
    if (page === "book-club") {
      setPage("personal-summary");
    } else {
      setPage("book-club");
    }
  };

    const handleSignOut = () => {

    }

  useEffect(() => {}, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-800">
        <h1 className="text-3xl font-bold text-white">Please Sign In</h1>
        <p className="text-lg text-gray-400 mt-2">
          You need to sign in to access this page.
        </p>
        <button
          className={
            "w-1/3 p-2 rounded-xl hover:bg-indigo-600 active:bg-indigo-400 bg-indigo-300 font-semibold"
          }
          onClick={googleSignIn}
        >
          Sign In with Google
        </button>
      </div>
    );
  }
  return (
    <div>
        { page === "book-club" ? (<BookClub onPageChange={handlePageChange} />) : (<PersonalPage onPageChange={handlePageChange}/>) }
    </div>
  )
};
  
  
