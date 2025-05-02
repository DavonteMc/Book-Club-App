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
    <div className="flex flex-col items-center mb-4">
      <h2 className="text-2xl md:text-4xl text-center font-bold mb-6">Join Book Club</h2>
      <p className="text-base md:text-xl text-center text-emerald-950/70 font-bold mb-6">Enter the code of the Book Club you'd like to join</p>
      <form
        onSubmit={joinGroup}
        className="w-full flex flex-col items-center"
      >
        {/* Group Code */}
        <input
          type="text"
          value={group.code}
          className="w-4/5 md:w-1/2 p-2 border text-center mt-6 border-emerald-950 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          onChange={(e) => onGroupCodeChange(e)}
          placeholder="Enter Group Code"
          required
        />
        <button
          type="submit"
          className="w-4/5 md:w-1/4 border-emerald-700 mt-6 border-2 font-semibold text-emerald-700 text-lg px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300"
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
