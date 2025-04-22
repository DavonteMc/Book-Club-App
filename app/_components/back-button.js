"use client";

import { ChevronLeft } from "lucide-react";
import { useDatabase } from "../_utils/data_context";

export default function BackButton({ page }) {
  const { setGroupStatus, setPersonalStatus } = useDatabase();

  const handleBackButtonClick = () => {
    if (page === "group") {
      setGroupStatus("none");
      return;
    }
    setPersonalStatus("none");
  };

  return (
    <div className="flex items-center mb-4 ml-3">
      <button
        className="flex items-center hover:text-neutral-900 hover:bg-emerald-950/25 rounded-lg p-1"
        onClick={() => handleBackButtonClick()}
      >
        <ChevronLeft size={24} className="mr-1" />
        <h2 className="font-semibold text-2xl mr-2">Back</h2>
      </button>
    </div>
  );
}
