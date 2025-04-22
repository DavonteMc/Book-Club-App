"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user, googleSignIn } = useUserAuth();
  const router = useRouter();

  

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-800">
      <h1 className="text-3xl font-bold p-2">Welcome</h1>
      {user ? (
        <div className="flex flex-col gap-6 ">
          <p className="text-lg p-2">Hello, {user.user_metadata.full_name}</p>
        </div>
      ) : (
        <button
          className={
            "w-1/3 p-2 rounded-xl hover:bg-emerald-600 active:bg-emerald-400 bg-emerald-800 font-semibold"
          }
          onClick={googleSignIn}
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}
