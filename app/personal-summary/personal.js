"use client";

import { useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useApp } from "../_utils/app-context";
import Header from "../_components/header";
import PersonalProgress from "../_components/under-development/personal-progress";

export default function Personal() {
  const { user, googleSignIn } = useUserAuth();
  const {
    personalStatus,
    setPersonalStatus,
    groupStatus,
    setGroupStatus,
    setPage,
  } = useApp();

  useEffect(() => {
    setPage("personal");
  }, []);

  useEffect(() => {}, [user]);

  useEffect(() => {
    const handleBackNavigation = (event) => {
      if (personalStatus !== "main") {
        // Reset to main view
        setPersonalStatus("main");
        // Maintain clean history
        if (event.state?.isPersonalSubpage) {
          window.history.replaceState(null, "");
        }
      }
    };

    // Add custom history entry when entering sub-pages
    if (personalStatus !== "main") {
      window.history.pushState({ isPersonalSubpage: true }, personalStatus);
    }

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
      // Clean up history when unmounting
      if (window.history.state?.isPersonalSubpage) {
        window.history.replaceState(null, "");
      }
    };
  }, [personalStatus, setPersonalStatus]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-3xl font-bold mb-8">Please Sign In</h1>
        <button
          className={
            "w-1/3 border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
          }
          onClick={googleSignIn}
        >
          Sign In with Google
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-8 py-4 overflow-y-auto ">
        {/* Personal Overview Section */}
        <div className="mb-8">
          {personalStatus === "main" && (
            <div className="space-y-10 lg:space-y-16">
              <h1 className="text-2xl font-bold text-center md:text-4xl mt-6 mb-4">
                Welcome to your Personal Summary
              </h1>
              <h3 className="text-lg font-semibold text-center text-emerald-950/80 md:text-2xl mb-">
                Select an option below to get started
              </h3>

              <div className="flex items-center flex-col space-y-4">
                <button
                  onClick={() => setPersonalStatus("progress")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Book Progress
                </button>
                <button
                  onClick={() => setPersonalStatus("reviews")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Reviews
                </button>
                <button
                  onClick={() => setPersonalStatus("reading-goals")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Reading Goals
                </button>
                <button
                  onClick={() => setPersonalStatus("want-to-read")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Want-to-Read List
                </button>
              </div>
            </div>
          )}

          {personalStatus !== "main" && (
            <div className="px-2 md:px-0 pt-7 md:pt-5 w-full">
              {/* Component containers */}
              <div className="mt-4">
                {personalStatus === "progress" && <PersonalProgress />}
                {personalStatus === "reviews" && <p>Reviews</p>}
                {personalStatus === "reading-goals" && <p>Reading Goals</p>}
                {personalStatus === "want-to-read" && <p>Want-to-Read</p>}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
