"use client";


import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useDatabase } from "../_utils/data_context";
import CreateGroup from "../_components/create-group";
import JoinGroup from "../_components/join-group";
import GroupOverview from "../_components/group-overview";
import LoadGroup from "../_components/load-group";
import Header from "../_components/header";

export default function BookClub({ onPageChange }) {
  const { user, googleSignIn } = useUserAuth();
  const { setGroupStatus, groupStatus } = useDatabase();

  useEffect(() => {}, [user]);

  useEffect(() => {
    const handleBackNavigation = (event) => {
      if (groupStatus !== "none") {
        // Reset to main view
        setGroupStatus("none");
        // Maintain clean history
        if (event.state?.isBookClubSubpage) {
          window.history.replaceState(null, "");
        }
      }
    };

    // Add custom history entry when entering sub-pages
    if (groupStatus !== "none") {
      window.history.pushState({ isBookClubSubpage: true }, groupStatus);
    }

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
      // Clean up history when unmounting
      if (window.history.state?.isBookClubSubpage) {
        window.history.replaceState(null, "");
      }
    };
  }, [groupStatus, setGroupStatus]);

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
      <Header onPageChange={ onPageChange }/>

      {/* Main Content */}
      <main className="flex-1 px-8 py-4 overflow-y-auto ">
        {/* Group Progress Section */}
        <div className="mb-8">
          {groupStatus === "none" && (
            <div className="space-y-10 lg:space-y-16">
              <h1 className="text-2xl font-bold text-center md:text-4xl mt-6 mb-4">
                Welcome to your Virtual Book Club
              </h1>
              <h3 className="text-lg font-semibold text-center text-emerald-950/80 md:text-2xl mb-">
                Load, Create or Join a Book Club to get started
              </h3>

              <div className="flex items-center flex-col space-y-4">
                <button
                  onClick={() => setGroupStatus("load-group")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Load Book Club
                </button>
                <button
                  onClick={() => setGroupStatus("create-group")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Create a Book Club
                </button>
                <button
                  onClick={() => setGroupStatus("join-group")}
                  className="w-4/5 md:w-1/3 py-3 text-base font-semibold text-emerald-700 border-2 border-emerald-700 rounded-lg 
                        hover:bg-emerald-900 hover:text-white transition duration-300"
                >
                  Join a Book Club
                </button>
              </div>
            </div>
          )}

          {groupStatus !== "none" && (
            <div className="px-2 md:px-0 pt-7 md:pt-5 w-full">
              {/* Component containers */}
              <div className="mt-4">
                {groupStatus === "load-group" && <LoadGroup />}
                {groupStatus === "create-group" && <CreateGroup />}
                {groupStatus === "join-group" && <JoinGroup />}
                {groupStatus === "inGroup" && <GroupOverview />}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
