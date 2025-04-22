"use client";

import {
  BookOpen,
  NotebookPen,
  LogOut,
  BookOpenText,
  Menu,
} from "lucide-react";
import NavItem from "../_components/nav-item";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
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
  const [menu, setMenu] = useState(false);

  const router = useRouter();
  const handleMenuToggle = () => {
    if (menu) {
      setMenu(false);
      return;
    }
    setMenu(true);
  };

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
            "w-1/3 p-2 rounded-xl hover:bg-emerald-600 active:bg-emerald-400 bg-emerald-800  font-semibold"
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
      <header className="sticky top-0 bg-white shadow-md z-50 px-4">
        <div className="container mx-auto ">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <BookOpenText size={30} className="text-emerald-800" />
              <h1 className="text-2xl font-bold text-gray-800">Bookie</h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <div className="flex items-center space-x-4">
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
                </div>
              </ul>
            </nav>
            <NavItem
              onLogOut={supabaseSignOut}
              icon={<LogOut size={18} />}
              label="Logout"
              name={user.user_metadata.full_name}
            />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto ">
        {/* Group Progress Section */}
        <div className="mb-8">
          {groupStatus === "none" && (
            <div>
              <h1 className="text-4xl font-bold mb-10 text-center">
                Welcome to your Virtual Book Club
              </h1>
              <h3 className="font-semibold text-emerald-950/80 text-center text-2xl mb-4">
                Load, Create or Join a Book Club to get started
              </h3>
              <div className="space-y-4 p-6 mb-8 text-center rounded-lg">
                <div className="space-x-4">
                  <button
                    onClick={() => setGroupStatus("load-group")}
                    className="border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
                  >
                    Load Book Club
                  </button>
                  <button
                    onClick={() => setGroupStatus("create-group")}
                    className="border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
                  >
                    Create a Book Club
                  </button>
                  <button
                    onClick={() => setGroupStatus("join-group")}
                    className="border-emerald-700 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
                  >
                    Join a Book Club
                  </button>
                </div>
              </div>
            </div>
          )}
          {groupStatus === "load-group" && (
            <div>
              <BackButton page="group" />
              <LoadGroup />
            </div>
          )}
          {groupStatus === "create-group" && (
            <div>
              <BackButton page="group" />
              <CreateGroup />
            </div>
          )}
          {groupStatus === "join-group" && (
            <div>
              <BackButton page="group" />
              <JoinGroup />
            </div>
          )}
          {groupStatus === "inGroup" && (
            <div>
              <BackButton page="group" />
              <GroupOverview />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
