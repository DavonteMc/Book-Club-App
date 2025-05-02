"use client";
import { useState, useEffect } from "react";
import { useDatabase } from "../_utils/data_context";

export default function LoadGroup() {
  const [loading, setLoading] = useState(false);
  const { groups, getGroups, assignGroup } = useDatabase();

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 mb-4 items-center">
        <h2 className="w-full text-center text-2xl md:text-4xl font-semibold  p-1">
          Choose Book Club
        </h2>
        {loading && <p>Loading...</p>}
        {groups.map((found, index) => (
          <button
            key={index}
            className="w-4/5 md:w-1/3 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl font-semibold text-emerald-700 px-4 py-2 hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
            onClick={() =>
              assignGroup({
                code: found.groups.group_code,
                name: found.groups.group_name,
              })
            }
          >
            {index + 1}. {found.groups.group_name}
          </button>
        ))}
      </div>
    </div>
  );
}
