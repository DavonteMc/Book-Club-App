"use client";

import {
  BookOpen,
  NotebookPen,
  LogOut,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import UserStatCard from "../_components/user-stat-card";
import NavItem from "../_components/nav-item";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useGroup } from "../_utils/group-context";
import { useDatabase } from "../_utils/data_context";
import { useRouter } from "next/navigation";
import CreateGroup from "../_components/create-group";
import JoinGroup from "../_components/join-group";
import GroupOverview from "../_components/group-overview";
import LoadGroup from "../_components/load-group";
import BackButton from "../_components/back-button";

export default function BookClub({ onPageChange }) {
  const { user, googleSignIn, supabaseSignOut } = useUserAuth();
  const { group, setGroupStatus, groupStatus } = useDatabase();
  const [bookSelection, setSelection] = useState({});
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();

  useEffect(() => {}, [user]);
  // useEffect(() => {
  //   if (group.code.length() === 36) {
  //     setGroupStatus("inGroup");
  //   }
  // }, [groupStatus]);

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
    <div className="flex h-screen bg-neutral-50 text-black bg-opacity-75">
      {/* Sidebar */}
      <aside className="w-64 shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Book Club</h2>
        <nav>
          <ul className="space-y-4 ">
            <NavItem
              onPageChange={onPageChange}
              currentPage={"home"}
              icon={<BookOpen size={18} />}
              label="Book Club"
            />
            <NavItem
              onPageChange={onPageChange}
              currentPage={"home"}
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
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user.user_metadata.full_name}
        </h1>

        {/* Group Progress Section */}
        <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20">
          {groupStatus === "none" && (
            <div>
              <h3 className="font-semibold text-2xl mb-4">
                Create or Join a Book Club
              </h3>
              <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
                <div className="space-x-4">
                <button
                    onClick={() => setGroupStatus("load-group")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Load Book Club
                  </button>
                  <button
                    onClick={() => setGroupStatus("create-group")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Create a Book Club
                  </button>
                  <button
                    onClick={() => setGroupStatus("join-group")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Join a Book Club
                  </button>
                </div>
              </div>
            </div>
          )}
          {groupStatus === "load-group" && (
            <div>
              <BackButton heading="Create a Book Club" status="none" />
              <LoadGroup />
            </div>
          )}
          {groupStatus === "create-group" && (
            <div>
              <BackButton heading="Create a Book Club" status="none" />
              <CreateGroup />
            </div>
          )}
          {groupStatus === "join-group" && (
            <div>
              <BackButton heading="Join a Book Club" status="none" />
              <JoinGroup />
            </div>
          )}
          {groupStatus === "inGroup" && (
            <div>
              <BackButton heading={group.name + "'s Overview"} status="none" />
              <p>Group Code: {group.code}</p>
              <p>Book: {group.book.title} by {group.book.author}</p>
              <GroupOverview />
            </div>
          )}
        </div>

        {/* Group Notes Section  */}
      </main>
    </div>
  );
}
