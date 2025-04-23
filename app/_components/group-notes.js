"use client";

import { MessageSquare, ChevronRight, ChevronDown } from "lucide-react";
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MessageSquare size={24} /> Club Notes
          </h3>
        </div>

        <div className="flex flex-col space-y-4">
          {notes.map((member, index) => (
            <div
              key={index}
              className="relative p-2 border border-emerald-800 rounded-lg"
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
                <p className="flex-1 text-sm border-t pt-2 border-emerald-950/30 mt-2">
                  {member.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
