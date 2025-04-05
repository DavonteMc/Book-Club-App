"use client";

import userData from "./users.json";
import bookData from "./books.json";
import HomeButton from "./homeButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import notepad from "./notepad.png";
import { useUserAuth } from "../_utils/auth-context";

export default function Home() {
  const { user } = useUserAuth();
  const [inFavour, setInFavour] = useState([]);


  let users = [...userData];
  let books = [...bookData];

  let changeBook = false;

  const handleBookChange = (e) => {
    if (!inFavour.includes(e)) {
      setInFavour([...inFavour, e]);
    }
  };
 
  // text-emerald-900
  return (
    <main className="flex-col m-1 bg-zinc-800">
      <HomeButton />

      <div className="flex-row m-1">
        <h1 className="text-2xl p-2 ml-2 inline">Welcome</h1>
        <p className="text-2xl font-bold inline">{users[0].name}</p>
      </div>

      {/* Current Book Club Book */}
      <div className="flex-col m-5 p-2 ">
        {/* Title */}
        <div className="flex-row items-center mb-3">
          <h2 className="text-2xl inline">Progress on: </h2>
          <p className="text-2xl font-bold inline">{users[0].currentBook}</p>
        </div>
        {/* Book Progress */}
        <div className="mb-2 p-2 border-indigo-900 border-4 rounded-lg ">
          {users.map((user) => (
            <div key={user.id} className="flex-col">
              <h3 className="text-xl font-semibold inline" >
                {user.name}
              </h3>
              <button className="w-14 p-2 m-1 border-2">
                <Image
                  src={notepad}
                  width={24}
                  height={24}
                  alt="Picture of notepad"
                />
              </button>
              <p>{user.currentProgress}</p>
            </div>
          ))}
          <button className="w-72 text-xl font-bold p-2 m-3 border-slate-900 border-2 rounded-md">
            Update Progress
          </button>
          <button
            className="text-xl p-2 w-72 font-bold text-white bg-indigo-900 rounded inline"
            onClick={() => {
              handleBookChange(users[0].name);
            }}
          >
            Vote to Change Book
          </button>
          {inFavour.length > 0 && (
            <div className=" ml-6 inline">
              <p className="font-bold inline">Those in Favour: </p>
              {inFavour.map((name) => (
                <p className="inline">{name} </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Personal Summary */}
      <div className="m-2 p-2 border-indigo-900 border-4 rounded-lg">
        <h2 className="text-2xl">Personal Summary</h2>
        <h3 className="text-xl font-semibold">Reading Goals</h3>
        <div>
          <div className="w-2/4 p-2">
            <ol>
              {users[0].readingGoals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ol>
          </div>
          <button className="w-1/4 p-2 m-2 border-slate-900 border-2">
            Add
          </button>
          <button className="w-1/4 p-2 m-2 border-slate-900 border-2">
            Remove
          </button>
        </div>
        <h3 className="text-xl font-semibold">Want to Read</h3>
        <div className="w-2/4 p-2">
          <ul>
            {users[0].wantToRead.map((book) => (
              <li key={book}>{book}</li>
            ))}
          </ul>
          <button className="w-1/4 p-2 m-2 border-slate-900 border-2">
            Add
          </button>
          <button className="w-1/4 p-2 m-2 border-slate-900 border-2">
            Remove
          </button>
        </div>
        <h3 className="text-xl font-semibold">Read</h3>
        <div className="w-2/4 p-2">
          <ul>
            {users[0].booksRead.map((book) => (
              <li key={book}>{book}</li>
            ))}
          </ul>
          <button className="w-1/4 p-2 m-2 border-slate-900 border-2">
            Add
          </button>
          <button className="w-1/4 p-2 m-2 border-slate-900 border-2">
            Remove
          </button>
        </div>
      </div>
    </main>
  );
}
