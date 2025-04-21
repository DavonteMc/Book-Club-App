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
    if (update) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };

  const handleNotesClick = () => {
    if (notes) {
      setNotes(false);
    } else {
      setNotes(true);
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
      <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
        <div className="space-x-6">
          <button
            type="button"
            className="rounded-md p-2 bg-slate-700"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            type="button"
            className="rounded-md p-2 bg-slate-700"
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
        {progress.length > 0 && (
          <div>
            {progress.map((member, index) => (
              <ProgressTracker
                key={index}
                name={member.name}
                page={member.currentPage}
                value={generateProgress(member.currentPage)}
              />
            ))}
          </div>
        )}
        {notes && <GroupNotes />}
      </div>
    </div>
  );
}
