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
  const { setGroupStatus, groupStatus } = useDatabase();
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    await supabaseSignOut();
    router.push("/");
  };

  const handleMenuToggle = () => {
    if (mobileMenu) {
      setMobileMenu(false);
      return;
    }
    setMobileMenu(true);
  };

  useEffect(() => {}, [user]);

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
      <header className="sticky top-0 bg-white shadow-md z-50 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div>
              <button
                type="button"
                onClick={() => setGroupStatus("none")}
                className="flex items-center space-x-3"
              >
                <BookOpenText size={30} className="text-emerald-800" />
                <h1 className="text-2xl font-bold text-gray-800">Bookie</h1>
              </button>
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
                  <NavItem
                    onLogOut={handleLogOut}
                    icon={<LogOut size={18} />}
                    label="Logout"
                    name={user.user_metadata.full_name}
                    className="flex place-items-end"
                  />
                </div>
              </ul>
            </nav>

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
      <main className="flex-1 px-8 py-4 overflow-y-auto ">
        {groupStatus !== "none" && <BackButton page="group" />}
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
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={handleMenuToggle}
        >
          <div className="absolute right-0 top-16 w-2/3 h-full bg-neutral-100 p-4 shadow-lg flex flex-col">
            <p className="text-sm italic text-center font-semibold mb-8">
              {user.user_metadata.full_name}
            </p>

            <div className="flex flex-col space-y-4">
              <NavItem
                onPageChange={onPageChange}
                currentPage={"home"}
                icon={<BookOpen size={20} />}
                label="Book Club"
              />

              <NavItem
                onPageChange={onPageChange}
                currentPage={"home"}
                icon={<NotebookPen size={20} />}
                label="Personal Summary"
              />
              <div className="mb-24"></div>
              <div className="mt-24 pt-4 border-t border-emerald-900">
                <NavItem
                  onLogOut={handleLogOut}
                  icon={<LogOut size={18} />}
                  label="Logout"
                  mobile={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
