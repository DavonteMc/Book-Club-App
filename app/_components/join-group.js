"use client";

import { useDatabase } from "../_utils/data_context";
import { useEffect, useState } from "react";

export default function JoinGroup() {
  const { group, setGroup, joinGroup } = useDatabase();
  const [error, setError] = useState(false);

  const onGroupCodeChange = (e) => {
    setGroup({ ...group, code: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (group.code === "") {
      alert("Please enter a group code");
      return;
    }
    await joinGroup(group.code);
  };

  useEffect(() => {
    setGroup({
      code: "",
      name: "",
      book: null,
    });
  }, []);

  return (
    <div className="flex flex-col justify-between gap-4 items-center mb-4">
      <h2 className="text-2xl font-bold mb-4">Enter the Book Club Code</h2>
      <form
        onSubmit={joinGroup}
        className="w-full flex flex-col items-center space-y-2"
      >
        {/* Group Code */}
        <input
          type="text"
          value={group.code}
          className="w-1/2 p-2 border border-emerald-950 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          onChange={(e) => onGroupCodeChange(e)}
          placeholder="Enter Group Code"
          required
        />
        <button
          type="submit"
          className="w-1/2 border-emerald-700 mt-4 border-2 font-semibold text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
        >
          Join Group
        </button>
        {error && (
          <p className="text-red-500">Invalid group code. Please try again.</p>
        )}
      </form>
    </div>
  );
}
