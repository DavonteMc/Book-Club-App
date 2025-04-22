"use client";

import { useState, useEffect } from "react";
import ProgressTracker from "../progress-tracker";
import UpdateProgress from "../update-progress";
import { useDatabase } from "../../_utils/data_context";
import { useUserAuth } from "../../_utils/auth-context";
import GroupNotes from "../group-notes";
import AddBook from "../add-book";
import SelectExistingBooks from "../select-book";

export default function PersonalOverview() {
  const { user } = useUserAuth();
  const { personalBook } = useDatabase();
  const [update, setUpdate] = useState(false);
  const [notes, setNotes] = useState(false);
  const [newBook, setNewBook] = useState(false);

  const handleNewBookClick = async () => {
    if (newBook) {
      setNewBook(false);
    } else {
      setNewBook(true);
    }
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

  useEffect(() => {}, []);

  return (
    <div>
      <div className="space-y-4 shadow-neutral-700 shadow-inner p-6 mb-8 rounded-lg border-b-2 border-white border-opacity-30">
        <div>
          <button
            type="button"
            className="rounded-md p-2 bg-slate-700"
            onClick={handleNewBookClick}
          >
            Track New Book
          </button>
        </div>

        {personalBook !== null && (
          <div>
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
            {update && <UpdateProgress />}
            <ProgressTracker
              name={user.user_metadata.full_name}
              page={13}
              value={55}
            />
          </div>
        )}

        {notes && <GroupNotes />}
      </div>
    </div>
  );
}
