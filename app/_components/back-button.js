"use client";

import { ChevronLeft } from "lucide-react";
import { useGroup } from "../_utils/group-context";

export default function BackButton({ heading, status }) {
  const { setGroupStatus } = useGroup();

  return (
    <div className="flex items-center mb-4">
      <button
        className=" hover:text-neutral-900 flex items-center"
        onClick={() => setGroupStatus(status)}
      >
        <ChevronLeft size={24} className="mr-3" />
      </button>
      <h2 className="font-semibold text-2xl ">{heading}</h2>
    </div>
  );
}
