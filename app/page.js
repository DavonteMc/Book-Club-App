"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function LandingPage() {
  const { user, googleSignIn } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [user]);

  return (
    <div>
      {!user && (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-50">
          <h1 className="text-5xl text-center mb-10 font-bold px-2">Welcome to Bookie</h1>
          <Link
            href="home"
            className={
              "w-3/4 md:w-1/3 border-emerald-700 border-2 text-center font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
            }
          >
            Click to Get Started
          </Link>
        </div>
      )}
      {user && (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-50">
          <Link
            href="home"
            className={
              "w-3/4 md:w-1/3 border-emerald-700 border-2 text-center text-lg font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
            }
          >
            Continue
          </Link>
        </div>
      )}
    </div>
  );
}
