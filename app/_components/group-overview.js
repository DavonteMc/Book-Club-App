"use client";

import { useState } from "react";
import ProgressTracker from "./progress-tracker";
import UpdateProgress from "./update-progress";
import { useGroup } from "../_utils/group-context";
import { useProgress } from "../_utils/progress-context";
import { useUserAuth } from "../_utils/auth-context";
import GroupNotes from "../_components/group-notes";

export default function GroupOverview({}) {
  const { user } = useUserAuth();
  const { group } = useGroup();
  const { groupProgress, setGroupProgress } = useProgress();
  const [update, setUpdate] = useState(false);
  const [notes, setNotes] = useState(false);

  const [progress, setProgress] = useState({ currentPage: 0, note: "" });

  // const individualProgress = groupProgress.memberProgress[user.Id];

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
            progress={progress}
            onProgressChange={setProgress}
            onUpdate={setUpdate}
          />
        )}
        <ProgressTracker label="User1" value={45} />
        <ProgressTracker label="User2" value={76} />
        <ProgressTracker label="User3" value={87} />
        {notes && <GroupNotes />}
      </div>
    </div>
  );
}
