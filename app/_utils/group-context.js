// "use client";

// import { useContext, createContext, useState, useEffect } from "react";
// import { useDatabase } from "./data_context";

// const GroupContext = createContext();

// export const GroupContextProvider = ({ children }) => {
//   const [group, setGroup] = useState({
//     code: "",
//     name: "",
//     book: null,
//   });
//   const [groupStatus, setGroupStatus] = useState("none");
//   const { createNewGroup, joinGroup } = useDatabase();

//   const handleGroupCreation = async (e) => {
//     e.preventDefault();
//     if (group.name === "") {
//       alert("Please enter a group name");
//       return;
//     }
//     const newGroup = await createNewGroup(group)
//     setGroup(newGroup);
//     setGroupStatus("inGroup");
//   };

//   const handleJoinGroup = (e) => {
//     e.preventDefault();
//     // Insert Into userGroups values (groupid, e.target.value) 
//     // if it fails, alert("Group does not exist with code" + e.target.value);
//     setGroupStatus("inGroup");
//   };

//   const checkGroup = () => {
//     // Check if group exists in the database
//     // If it does, set group state
//     // If it doesn't, set error state
//   };

//   // useEffect(() => {
//   //   // Check if group exists in the database
//   //   checkGroup();
//   // }, []);

//   return (
//     <GroupContext.Provider
//       value={{ group, setGroupName, setGroupBook, handleGroupCreation, groupStatus, setGroupStatus, handleJoinGroup, setGroupCode }}
//     >
//       {children}
//     </GroupContext.Provider>
//   );
// };

// export const useGroup = () => {
//   return useContext(GroupContext);
// };
