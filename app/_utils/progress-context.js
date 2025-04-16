"use client";

import { useGroup } from "./group-context";
import { useContext, createContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export const ProgressContextProvider = ({ children }) => {
  const { group } = useGroup();
  const [groupProgress, setGroupProgress] = useState({
    groupCode: group.code,
    memberProgress: [], // { userId: {currentPage: 0, note: ""} }
  });

  // Operations for Progress Sections 
  const getGroupProgress = async (groupCode) => {
    // SELECT userid, note, current_pg, num_of_pages 
    // from user_groups 
    // join user_progress using (userid) 
    // join books using (book_id) 
    // where group_code = group.code
    // const prog = { userId: current_pg/num_of_pages }
    // setGroupProgress()
  };

  const getUserProgress = async (userId) => {
    // SELECT userid, note, current_pg, num_of_pages 
    // from user_progress 
    // join books using (book_id) 
    // where user_id = userId
    // const prog = { userId: current_pg/num_of_pages }
  };

  const updateUserProgress = async (userId, bookId, currentPage, note) => {
    if (note === "") {
      // UPDATE user_progress 
      // SET current_pg = currentPage 
      // WHERE user_id = userId AND book_id = bookId
      // return;
    }

    // UPDATE user_progress 
    // SET current_pg = currentPage, note = note
    // WHERE user_id = userId AND book_id = bookId
  };


  // Operations for Reading Goals Section 
  const getReadingGoals = async (userId) => {
    // SELECT goal 
    // from user_goals 
    // where user_id = userId
    // const goals = { bookId: goal }
  };

  const updateReadingGoals = async (userId, goalId, goal) => {
    // UPDATE user_goals 
    // SET goal = goal 
    // WHERE user_id = userId AND goal_id = goalId
  };

const addReadingGoals = async (userId, goal) => {
    // INSERT INTO user_goals (user_id, goal) 
    // VALUES (userId, goal)
  };

  const deleteReadingGoals = async (userId, goalId) => {
    // DELETE FROM user_goals 
    // WHERE user_id = userId AND goal_id = goalId
  };
  

  // Operations for Want-to-Read Section 
  const getWantToRead = async (userId) => {
    // SELECT book 
    // from user_want_to_read 
    // where user_id = userId
    // const books = { bookId: true }
  };

  const addWantToRead = async (userId, title) => {
    // INSERT INTO user_want_to_read (user_id, book) 
    // VALUES (userId, title)
  };

  const deleteWantToRead = async (userId, title) => {
    // DELETE FROM user_want_to_read 
    // WHERE user_id = userId AND book = title
  };


  return (
    <ProgressContext.Provider
      value={{  }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  return useContext(ProgressContext);
};
