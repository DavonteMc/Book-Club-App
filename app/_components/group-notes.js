"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "../_utils/data_context";

export default function GroupNotes({}) {
  const { getGroupNotes, notes } = useDatabase();
  const [showUserNote, setShowUserNote] = useState(false);
  const [userNoteIndex, setUserNoteIndex] = useState(null);

  const handleUserNote = (index) => {
    if (showUserNote && userNoteIndex !== null && userNoteIndex !== index) {
      setShowUserNote(false);
      setUserNoteIndex(index);
      setShowUserNote(true);
      return;
    }
    if (showUserNote && userNoteIndex === index) {
      setShowUserNote(false);
      setUserNoteIndex(null);
      return;
    }
    setShowUserNote(true);
    setUserNoteIndex(index);
  };

  useEffect(() => {
    const fetchGroupNotes = async () => {
      await getGroupNotes();
    };
    fetchGroupNotes();
  }, []);

  return (
    <div className="mt-6 h-full w-full md:w-1/2 rounded-lg p-3 ">
      <div>
        <div className="flex flex-col space-y-4">
          {notes.map((member, index) => (
            <div
              key={index}
              className="relative p-2 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  {/* Desktop button */}
                  <button
                    className="hidden hover:text-neutral-900 md:flex items-center"
                    onClick={() => handleUserNote(index)}
                  >
                    {member.member_name} on page.{member.current_pg}
                    {showUserNote && index === userNoteIndex ? (
                      <ChevronDown size={16} className="ml-1" />
                    ) : (
                      <ChevronRight size={16} className="ml-1" />
                    )}
                  </button>
                  {/* Mobile button */}
                  <button
                    className="md:hidden hover:text-neutral-900 flex items-center"
                    onClick={() => handleUserNote(index)}
                  >
                    <span className="w-5/5 text-wrap">
                      {member.member_name} on page.{member.current_pg}
                    </span>
                  </button>
                </div>

                <span className="text-xs text-wrap w-1/5 text-emerald-900 whitespace-nowrap">
                  {member.date}
                </span>
              </div>
              {showUserNote && index === userNoteIndex && (
                <div className="flex-1 border-t py-2 md:py-4 border-emerald-950/30 ">
                  <p className="text-sm text-wrap md:ml-4 ">
                    {member.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
