"use client";
import { useState, useEffect } from "react";
import { useDatabase } from "../_utils/data_context";

export default function LoadGroup() {
  const [loading, setLoading] = useState(false);
  // pass these in so it can be used on the personal page as well: const { group, setGroupBookId } = useGroup();
  const { groups, getGroups, assignGroup } = useDatabase();

  // const handleBookChange = (book) => {
  //   //onBookSelection(books.find((book) => book.bookId === e.target.value));
  //   setSelectedBook(book);
  //   // setBook can be used to set the selected bookId in the group context
  // };


  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col justify-between gap-4 mb-4">
        <p className="w-full bg-slate-800 text-center rounded-lg text-lg font-semibold text-white p-1">
          Choose Books:
        </p>
        {loading && <p>Loading...</p>}
        {groups.map((found, index) => (
          <button
            key={index}
            className="w-full bg-slate-800 rounded-lg text-white p-2 text-left hover:bg-slate-500 hover:text-black"
            onClick={() =>
              assignGroup({
                code: found.groups.group_code,
                name: found.groups.group_name,
              })
            }
          >
            {index + 1}. {found.groups.group_name}
          </button>
        ))}
      </div>
    </div>
  );
}
