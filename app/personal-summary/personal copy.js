"use client";

import { BookOpen, NotebookPen, LogOut, BookOpenText } from "lucide-react";
import NavItem from "../_components/nav-item";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useDatabase } from "../_utils/data_context";
import { useRouter } from "next/navigation";
import PersonalOverview from "../_components/under-development/personal-overview";
import BackButton from "../_components/back-button";
import TrackNewBook from "../_components/under-development/track-new-book";
import ReadingGoals from "../_components/under-development/reading-goals";
import WantToRead from "../_components/under-development/want-to-read";
import ReadBooks from "../_components/under-development/reviews";

export default function PersonalPage({ onPageChange }) {
  const [page, setPage] = useState("personal-summary");
  const { user, googleSignIn, supabaseSignOut } = useUserAuth();
  const { group, personalStatus, setPersonalStatus } = useDatabase();
  const [books, setBooks] = useState([]);
  const router = useRouter();

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
            "w-1/3 p-2 rounded-xl hover:bg-emerald-600 active:bg-emerald-400 bg-emerald-300 font-semibold"
          }
          onClick={googleSignIn}
        >
          Sign In with Google
        </button>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-neutral-50 text-black bg-opacity-75">
      {/* Sidebar */}
      <aside className="w-64 shadow-md p-4">
        <div className="flex items-center mb-6">
          <BookOpenText size={30} className="mr-3" />
          <h2 className="text-2xl font-bold">Bookie</h2>
        </div>
        <nav>
          <ul className="space-y-4 ">
            <NavItem
              onPageChange={onPageChange}
              currentPage={"personal"}
              icon={<BookOpen size={18} />}
              label="Book Club"
            />
            <NavItem
              onPageChange={onPageChange}
              currentPage={"personal"}
              icon={<NotebookPen size={18} />}
              label="Personal Summary"
            />
            <NavItem
              onLogOut={supabaseSignOut}
              icon={<LogOut size={18} />}
              label="Logout"
            />
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto ">
        <h1 className="text-3xl font-bold mb-6">Personal Summary</h1>
        {/* Personal Summary Section */}
        <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20">
          {personalStatus === "none" && (
            <div>
              <p className="text-3xl">Under Development</p>
              <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
                <div className="space-x-4">
                  <button
                    onClick={() => setPersonalStatus("track-book")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Track New Book
                  </button>
                  <button
                    onClick={() => setPersonalStatus("load-book")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Load a Tracked Book
                  </button>
                </div>
              </div>
            </div>
          )}
          {personalStatus === "track-book" && (
            <div>
              <BackButton heading="Add a book to tracked" page="personal" />
              <TrackNewBook />
            </div>
          )}
          {personalStatus === "load-book" && (
            <div>
              <BackButton heading="Load a book" page="personal" />
              <p className="text-3xl">Under Development</p>
            </div>
          )}
          {personalStatus === "loaded-book" && (
            <div>
              <BackButton
                heading={user.user_metadata.full_name + "'s Overview"}
                page="personal"
              />
              <p className="text-3xl">Under Development</p>
              <PersonalOverview />
            </div>
          )}
        </div>
        <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30"></div>

        <ReadingGoals />
        <ReadBooks />
        <WantToRead />
      </main>
    </div>
  );
}
