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
                    className="hidden hover:text-neutral-900 p-2 md:flex items-center"
                    onClick={() => handleUserNote(index)}
                  >
                    <div className="flex flex-col">
                      <p className="ml-1 font-semibold">{member.member_name}</p>
                      <p className="text-xs text-left ml-1 ">
                        On page: {member.current_pg}
                      </p>
                    </div>

                    {showUserNote && index === userNoteIndex ? (
                      <ChevronDown size={28} className="ml-4" />
                    ) : (
                      <ChevronRight size={28} className="ml-4" />
                    )}
                  </button>
                  {/* Mobile button */}
                  <button
                    className="md:hidden hover:text-neutral-900 flex-col items-center"
                    onClick={() => handleUserNote(index)}
                  >
                    <p className="w-full text-wrap">{member.member_name}</p>
                    <p className="text-xs text-left mt-1">
                      On page: {member.current_pg}
                    </p>
                  </button>
                </div>

                <p className="text-xs text-wrap md:text-sm w-2/6 text-emerald-900 whitespace-nowrap">
                  {member.date}
                </p>
              </div>
              {showUserNote && index === userNoteIndex && (
                <div className="flex-1 flex-col border-t py-1 md:py-4 mt-2 border-emerald-950/30 ">
                  <p className="text-sm text-wrap md:ml-4 ">{member.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
