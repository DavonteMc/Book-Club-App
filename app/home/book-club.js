"use client";

import {
  BookOpen,
  NotebookPen,
  LogOut,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import UserStatCard from "../_components/user-stat-card";
import NavItem from "../_components/nav-item";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import bookData from "./books.json";
import { useRouter } from "next/navigation";
import SearchBooks from "../_components/search-books";

const messages = [
  {
    module: "System Administrator",
    message:
      "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.",
    timestamp: "15:42:12",
  },
  {
    module: "Security Module",
    message:
      "Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist.",
    timestamp: "14:30:45",
  },
  {
    module: "Network Control",
    message:
      "Bandwidth allocation adjusted for priority services during peak hours.",
    timestamp: "12:15:33",
  },
  {
    module: "Data Center",
    message: "Backup verification complete. All data integrity checks passed.",
    timestamp: "09:05:18",
  },
  // Add more hidden messages here
];

export default function BookClub({ onPageChange }) {
  const [page, setPage] = useState("book-club");
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();
  const [groupStatus, setGroupStatus] = useState("none");
  const router = useRouter();

  const [books, setBooks] = useState([]);

  let bookList = [...bookData];

  const visibleMessages = messages.slice(-4); // Show last 4 messages

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
              onLogOut={firebaseSignOut}
              icon={<LogOut size={18} />}
              label="Logout"
            />
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto ">
        <h1 className="text-3xl font-bold mb-6">
          {user.displayName}'s Overview
        </h1>

        {/* Group Progress Section */}
        {groupStatus === "none" && (
          <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20">
            <h3 className="font-semibold text-2xl mb-4">Create a Book Club</h3>
            <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
              <p className="text-gray-600 text-sm">
                You are not currently in a book club. Create or join a book club
                to start tracking your progress.
              </p>
              <div className="space-x-4">
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
        {groupStatus === "create-group" && (
          <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20">
            <h2 className="font-semibold text-2xl mb-4">Create a Book Club</h2>

            <SearchBooks />
          </div>
        )}
        {groupStatus === "inGroup" && (
          <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20">
            <h3 className="font-semibold text-2xl mb-4">
              Group Progress for{" "}
              <span className="font-bold">{bookList[0].title}</span>
            </h3>
            <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
              <ProgressItem label="User1" value={42} />
              <ProgressItem label="User2" value={76} />
              <ProgressItem label="User3" value={87} />
            </div>
          </div>
        )}

        {/* Individual Progress Section */}
        <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20 ">
          <h3 className="font-semibold text-2xl mb-4">
            Individual Progress for{" "}
            <span className="font-bold">{bookList[0].title}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <UserStatCard
              icon={<NotebookPen size={20} />}
              title={user.displayName}
              value="42%"
              subtext="pg. 120"
              progress={42}
            />
            <UserStatCard
              icon={<NotebookPen size={20} />}
              title="User2"
              value="76%"
              subtext="pg. 234"
              progress={76}
            />
            <UserStatCard
              icon={<NotebookPen size={20} />}
              title="User3"
              value="87%"
              subtext="pg. 289"
              progress={87}
            />
          </div>
        </div>
        {/* Group Notes Section  */}
        <div className="mb-8 border-b-2 border-neutral-700 border-opacity-20">
          <h3 className="font-semibold text-2xl mb-4">
            Group Notes for{" "}
            <span className="font-bold">{bookList[0].title}</span>
          </h3>
          <div className="shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare size={18} /> Notes
              </h3>
              <button className=" hover:text-neutral-900 flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {visibleMessages.map((message, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-b-2 border-white border-opacity-30 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm mb-1">
                        {message.module}
                      </h4>
                      <p className="text-gray-600 text-sm">{message.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Components

const ProgressItem = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 rounded-full h-2"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const StatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <span
      className={`px-2 py-1 rounded-full text-sm ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  </div>
);
