"use client";

import {
  BookOpen,
  NotebookPen,
  LogOut,
  BookOpenText,
  Menu,
} from "lucide-react";
import NavItem from "../_components/nav-item";
import { useDatabase } from "../_utils/data_context";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "../_utils/app-context";

export default function Header() {
  const { user } = useUserAuth();
  const { setGroupStatus } = useApp();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenuToggle = () => {
    if (mobileMenu) {
      setMobileMenu(false);
      return;
    }
    setMobileMenu(true);
  };

  return (
    <div>
      <header className="sticky top-0 bg-white shadow-md z-50 px-4 md:px-2">
        <div className="container mx-auto">
          <div className="flex items-center h-16">
            {/* Logo Section */}
            <div className="mr-4">
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
            <nav className="hidden md:block flex-grow ml-auto">
              <ul className="flex">
                <div className="ml-2 flex items-center space-x-4">
                  <NavItem icon={<BookOpen size={18} />} label="Book Club" />
                  <NavItem
                    icon={<NotebookPen size={18} />}
                    label="Personal Summary"
                  />
                </div>

                <div className="flex ml-auto">
                  <NavItem
                    icon={<LogOut size={18} />}
                    label="Logout"
                    name={user.user_metadata.full_name}
                    desktop={true}
                  />
                </div>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-auto p-2 rounded-lg hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>
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
              <NavItem icon={<BookOpen size={20} />} label="Book Club" />

              <NavItem
                icon={<NotebookPen size={20} />}
                label="Personal Summary"
              />
              <div className="mb-24"></div>
              <div className="mt-24 pt-4 border-t border-emerald-900">
                <NavItem
                  icon={<LogOut size={18} />}
                  label="Logout"
                  mobile={true}
                  name={user.user_metadata.full_name}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
