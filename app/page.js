"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user, googleSignIn } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    await googleSignIn();
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-50">
      <h1 className="text-5xl font-bold p-2">Welcome to Bookie</h1>
      {user ? (
        <div className="flex flex-col gap-6 ">
          <p className="text-xl text-center p-2">Hello, {user.user_metadata.full_name}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 ">
          <h2 className="text-lg" >To get started <span className="font-bold">sign in</span> with your Google Account</h2>
          {!loading &&<button
            className={
              "w-full border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
            }
            onClick={handleSignIn}
          >
            Sign In with Google
          </button>}
          {loading && (
            <p
              className={
                "w-full text-xl text-center p-2"
              }
            >
              Loading...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
