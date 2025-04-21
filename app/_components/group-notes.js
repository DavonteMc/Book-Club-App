"use client";

import {
  MessageSquare,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
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
    <div className="mb-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MessageSquare size={24} /> Notes
          </h3>
        </div>

        {/* Sort by Page Number */}
        <div className="space-y-4">
          {notes.map((member, index) => (
            <div
              key={index}
              className="relative px-2 py-1 shadow-neutral-700 shadow-inner rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <button
                    className=" hover:text-neutral-900 flex items-center"
                    onClick={() => handleUserNote(index)}
                  >
                    {member.member_name} on page.{member.current_pg}
                    {showUserNote && index === userNoteIndex ? (
                      <ChevronDown size={16} className="ml-1" />
                    ) : (
                      <ChevronRight size={16} className="ml-1" />
                    )}
                  </button>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {member.date}
                </span>
              </div>
              {showUserNote && index === userNoteIndex && (
                <p className="text-gray-600 text-sm">{member.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
