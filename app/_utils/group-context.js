"use client";

import { useContext, createContext, useState, useEffect } from "react";

const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [group, setGroup] = useState({
    code: "",
    name: "",
    bookId: "",
  });
  const [groupStatus, setGroupStatus] = useState("none");


  const setGroupName = (e) => {
    setGroup({ ...group, name: e.target.value });
  };

  const setGroupBookId = (e) => {
    setGroup({ ...group, bookId: e.target.value });
  };

  const setGroupCode = (e) => {
    setGroup({ ...group, code: e.target.value });
  };

  const handleGroupCreation = (e) => {
    e.preventDefault();
    if (group.name === "") {
      alert("Please enter a group name");
      return;
    }
    // if (group.bookId === "") {
    //   alert("Please enter a book ID");
    //   return;
    // }
    // Create group in the database
    setGroupStatus("inGroup");
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    // Insert Into userGroups values (groupid, e.target.value) 
    // if it fails, alert("Group does not exist with code" + e.target.value);
    setGroupStatus("inGroup");
  };

  const checkGroup = () => {
    // Check if group exists in the database
    // If it does, set group state
    // If it doesn't, set error state
  };

  // useEffect(() => {
  //   // Check if group exists in the database
  //   checkGroup();
  // }, []);

  return (
    <GroupContext.Provider
      value={{ group, setGroupName, setGroupBookId, handleGroupCreation, groupStatus, setGroupStatus, handleJoinGroup, setGroupCode }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  return useContext(GroupContext);
};
