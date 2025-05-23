"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Personal from "./personal";

export default function HomePage() {
  const { user, googleSignIn } = useUserAuth();
 
  useEffect(() => {}, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-3xl font-bold mb-8">Please Sign In</h1>
        <button
          className={
            "w-3/4 md:w-1/3 border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
          }
          onClick={googleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    );
  }
  return (
    <div>
      <Personal />
    </div>
  );
}
