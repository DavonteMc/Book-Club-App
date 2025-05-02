"use client";

import { useState, useEffect } from "react";
import ProgressTracker from "./progress-tracker";
import UpdateProgress from "./update-progress";
import { useDatabase } from "../_utils/data_context";
import GroupNotes from "../_components/group-notes";
import CopyButton from "./copy-button";

export default function GroupOverview({}) {
  const { group, getGroupMemberProgress, progress } = useDatabase();
  const [update, setUpdate] = useState(false);
  const [updateProcessed, setUpdateProcessed] = useState(false);
  const [notes, setNotes] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedStyle =
    "border-emerald-700 border-2 w-3/4 md:w-1/3 h-10 text-xs md:text-base font-semibold text-white p-1 rounded-lg bg-emerald-900 text-emerald-700" +
    " transition duration-300";

  const unSelectedStyle =
    "border-emerald-700 border-2 w-3/4 md:w-1/3 h-10 text-xs md:text-base font-semibold text-emerald-700 p-1 rounded-lg " +
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
      setUpdate(true);
      return;
    }
    if (update) {
      setUpdate(false);
      setNotes(false);
      return;
    }
    setUpdate(true);
  };

  const handleNotesClick = () => {
    if (update) {
      setUpdate(false);
      setNotes(true);
      return;
    }
    if (notes) {
      setNotes(false);
      setUpdate(false);
      return;
    }
    setNotes(true);
  };

  useEffect(() => {
    const fetchGroupMembers = async () => {
      await getGroupMemberProgress();
    };
    setLoading(true);
    fetchGroupMembers();
    setLoading(false);
    setUpdateProcessed(false);
  }, [updateProcessed]);

  return (
    <div>
      <div className="flex flex-col w-full mb-4 items-center">
        <h2 className="flex flex-col space-y-1 text-center text-3xl md:text-5xl font-semibold mb-3">
          {group.name}
          <span className="text-xs md:text-base font-semibold">
            <CopyButton textToCopy={group.code} />
          </span>
        </h2>
        <h3 className="w-full text-center text-base md:text-2xl font-medium py-2 mb-3 md:mb-12">
          Progress on:{" "}
          <span className="font-semibold text-emerald-700 ">
            {group.book.title}
          </span>{" "}
          <span className="text-sm md:text-xl">by</span>{" "}
          <span className="font-semibold text-emerald-700">
            {group.book.author}
          </span>
        </h3>
        <div className="w-full flex-col md:flex-row items-center md:w-2/5 space-y-2 md:space-x-3 p-2 mb-2 md:mb-8 text-center rounded-lg">
          <button
            type="button"
            className={
              update ? selectedStyle : unSelectedStyle
            }
            onClick={handleUpdateClick}
          >
            {update ? "Close" : "Update Progress"}
          </button>
          <button
            type="button"
            className={
              notes ? selectedStyle : unSelectedStyle
            }
            onClick={handleNotesClick}
          >
            {notes ? "Close" : "View Notes"}
          </button>
        </div>
        {update && (
          <UpdateProgress
            onCompletion={setUpdateProcessed}
            onUpdate={setUpdate}
          />
        )}
        {notes && <GroupNotes />}
        {loading && (
          <p className="text-center text-5xl font-semibold mb-5">Loading...</p>
        )}
        {!notes && !update && progress.length > 0 && (
          <div className="flex flex-col w-full h-full mt-5 items-center">
            {progress.map((member, index) => (
              <div
                className="w-full md:w-3/4 mb-3 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl"
                key={index}
              >
                <ProgressTracker
                  key={index}
                  name={member.name}
                  page={member.currentPage}
                  value={generateProgress(member.currentPage)}
                  total={group.book.num_of_pages}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
