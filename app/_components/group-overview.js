"use client";

import { useState, useEffect } from "react";
import ProgressTracker from "./progress-tracker";
import UpdateProgress from "./update-progress";
import { useDatabase } from "../_utils/data_context";
import { useUserAuth } from "../_utils/auth-context";
import GroupNotes from "../_components/group-notes";

export default function GroupOverview({}) {
  const { user } = useUserAuth();
  const { group, getGroupMemberProgress, progress } = useDatabase();
  const [update, setUpdate] = useState(false);
  const [updateProcessed, setUpdateProcessed] = useState(false);
  const [notes, setNotes] = useState(false);
  const [selected, setSelected] = useState(null);

  const selectedStyle =
    "border-emerald-700 border-2 w-52 font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    "hover:bg-emerald-100/80 hover:text-emerald-700 hover:font-semibold transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-52 font-semibold text-emerald-700 p-1 rounded-lg " +
    "hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300";

  const generateProgress = (currentPage) => {
    if (
      currentPage === 0 ||
      currentPage === null ||
      currentPage === undefined
    ) {
      return 0;
    }
    const progressValue = (currentPage / group.book.num_of_pages) * 100;
    return Math.round(progressValue);
  };

  const handleUpdateClick = () => {
    if (notes) {
      setNotes(false);
    }
    if (update) {
      setUpdate(false);
      setSelected(null);
    } else {
      setUpdate(true);
      setSelected("update");
    }
  };

  const handleNotesClick = () => {
    if (update) {
      setUpdate(false);
    }
    if (notes) {
      setNotes(false);
      setSelected(null);
    } else {
      setNotes(true);
      setSelected("notes");
    }
  };

  useEffect(() => {
    const fetchGroupMembers = async () => {
      await getGroupMemberProgress(group.code);
    };
    fetchGroupMembers();
    setUpdateProcessed(false);
  }, [updateProcessed]);

  return (
    <div>
      <div className="flex flex-col w-full mb-4 items-center">
        <h2 className="text-center text-4xl font-semibold mb-5">
          {group.name}
          <br />
          <span className="text-base font-semibold">
            Code:{" "}
            <span className="font-semibold text-emerald-900 text-opacity-80">
              {group.code}
            </span>
          </span>
        </h2>
        <h3 className="text-center w-3/4 text-2xl font-medium p-2 mb-4">
          Club Progress on{" "}
          <span className="font-semibold text-emerald-700 ">
            {group.book.title}
          </span>{" "}
          <span className="text-xl">by</span>{" "}
          <span className="font-semibold text-emerald-700">
            {group.book.author}
          </span>
        </h3>
        {/* Update and Notes Buttons */}
        <div className="space-x-6">
          <button
            type="button"
            className={selected === "update" ? selectedStyle : unSelectedStyle}
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            type="button"
            className={selected === "notes" ? selectedStyle : unSelectedStyle}
            onClick={handleNotesClick}
          >
            {notes ? "Close Notes" : "View Notes"}
          </button>
        </div>
        {update && (
          <UpdateProgress
            onCompletion={setUpdateProcessed}
            onUpdate={setUpdate}
          />
        )}
        {notes && <GroupNotes />}
        {!notes && !update && progress.length > 0 && (
          <div className="flex flex-col w-full h-full mt-4 items-center">
            {progress.map((member, index) => (
              <ProgressTracker
                key={index}
                name={member.name}
                page={member.currentPage}
                value={generateProgress(member.currentPage)}
                total={group.book.num_of_pages}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
