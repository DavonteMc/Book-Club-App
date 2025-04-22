"use client";

import { useDatabase } from "../_utils/data_context";
import { useEffect } from "react";


export default function JoinGroup() {
  // const { group, setGroupCode, handleJoinGroup } = useGroup();
  const { group, setGroup, joinGroup } = useDatabase();

  const onGroupCodeChange = (e) => {
    setGroup({ ...group, code: e.target.value });
  };


  useEffect(() => {
      setGroup({
        code: "",
        name: "",
        book: null,
      });
    }, []);

  return (
    <div className="p-6 rounded-lg shadow-sm">
      <div className="flex flex-col justify-between gap-4 mb-4">
        <p className="text-lg font-bold mb-4">Enter the Book Club Code</p>
        <form onSubmit={joinGroup} className="space-y-2">
          {/* Group Code */}
          <input
            type="text"
            value={group.code}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onGroupCodeChange(e)}
            placeholder="Enter Group Code"
            required
          />
          <button
            type="submit"
            className="mr-2 bg-sky-300 rounded-lg p-2 place-content-center"
          >
            Join Group
          </button>
        </form>
      </div>
    </div>
  );
}
