"use client";

import {
  BookOpen,
  NotebookPen,
  LogOut,
  MessageSquare,
  CirclePlus,
  Check,
  CircleMinus,
} from "lucide-react";
import NavItem from "../_components/nav-item";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useDatabase } from "../_utils/data_context";
import { useRouter } from "next/navigation";
import PersonalOverview from "../_components/personal-overview";



export default function PersonalPage({ onPageChange }) {
  const [page, setPage] = useState("personal-summary");
  const { user, googleSignIn, supabaseSignOut } = useUserAuth();
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
        <PersonalOverview/>
        
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
