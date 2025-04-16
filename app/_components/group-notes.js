"use client";

import {
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const messages = [
  {
    module: "System Administrator",
    message:
      "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.",
    timestamp: "15:42:12",
  },
  {
    module: "Security Module",
    message:
      "Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist.",
    timestamp: "14:30:45",
  },
  {
    module: "Network Control",
    message:
      "Bandwidth allocation adjusted for priority services during peak hours.",
    timestamp: "12:15:33",
  },
  {
    module: "Data Center",
    message: "Backup verification complete. All data integrity checks passed.",
    timestamp: "09:05:18",
  },
  // Add more hidden messages here
];
const visibleMessages = messages.slice(-4); // Show last 4 messages

export default function GroupNotes({}) {
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
          {visibleMessages.map((message, index) => (
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
                    {message.module}
                    <span className="text-sm font-bold text-gray-500 ml-2">
                      User#
                    </span>
                    {showUserNote && index === userNoteIndex ? (
                      <ChevronDown size={16} className="ml-1" />
                    ) : (
                      <ChevronRight size={16} className="ml-1" />
                    )}
                  </button>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {message.timestamp}
                  <span className="text-sm font-bold text-gray-500 ml-2">
                    Current Page #
                  </span>
                </span>
              </div>
              {showUserNote && index === userNoteIndex && (
                <p className="text-gray-600 text-sm">
                  {message.message}
                  <span className="text-sm font-bold text-gray-500 ml-2">
                    Note
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
