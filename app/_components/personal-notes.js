"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "../_utils/data_context";

export default function PersonalNotes({ book }) {
  const { getPersonalNotes, personalNotes } = useDatabase();
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
    const fetchPersonalNotes = async () => {
      await getPersonalNotes(book.book_id);
    };
    fetchPersonalNotes();
  }, []);

  return (
    <div className="mt-6 h-full w-full md:w-5/6 rounded-lg p-3 ">
      <div>
        <div className="flex flex-col space-y-4">
          {personalNotes.map((note, index) => (
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
                    On page: {note.current_pg}
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
                      On page:{note.current_pg}
                    </span>
                  </button>
                </div>

                <span className="text-xs text-wrap w-1/5 text-emerald-900 whitespace-nowrap">
                  {note.date}
                </span>
              </div>
              {showUserNote && index === userNoteIndex && (
                <div className="flex-1 flex-col border-t py-1 md:py-4 mt-2 border-emerald-950/30 ">
                <p className="text-sm text-left text-wrap md:ml-4 ">{note.note}</p>
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
