"use client";
import { useUserAuth } from "./auth-context";
import { useContext, createContext, useState, useEffect } from "react";
import supabase from "./supabase";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [group, setGroup] = useState({
    code: "",
    name: "",
    book: null,
  });
  const [groupStatus, setGroupStatus] = useState("none");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const { user } = useUserAuth();

  const getBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");
    if (error) {
      console.error("Error fetching books:", error);
    }
    setBooks(data);
  };

  const addBook = async (book) => {
    let insertBook = {
      title: book.title,
      author: book.author,
      num_of_pages: book.numOfPages,
    };
    const { data, error } = await supabase
      .from("books")
      .insert([insertBook])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
    }
    console.log("Added book:", data);
    const newBook = data ?? null;
    setSelectedBook(newBook);
  };

  const addToGroupTable = async (group) => {
    const insertGroup = {
      group_name: group.name,
    };
    const { groupDetails, error } = await supabase
      .from("groups")
      .insert([insertGroup])
      .select()
      .single();

    if (error) {
      throw new Error(error);
    }
    return groupDetails;
  };

  const addToGroupMembersTable = async (group_code) => {
    const { error } = await supabase
      .from("group_members")
      .insert([{ group_code: group_code, user_id: user.id }]);

    if (error) {
      throw new Error(error);
    }
  };

  const addToGroupBooksTable = async (group_code) => {
    const { error } = await supabase
      .from("group_books")
      .insert([{ group_code: group_code, book_id: group.book.bookId }]);

    if (error) {
      throw new Error(error);
    }
  };

  const createNewGroup = async (e) => {
    e.preventDefault();

    try {
      const groupData = await addToGroupTable(group);
      console.log("Group created:", groupData);

      // Adds to group members table
      await addToGroupMembersTable(groupData.group_code);
      console.log("Added to group members:", groupData.group_code);

      // Adds to group books table
      await addToGroupBooksTable(groupData.group_code);
      console.log("Added to group books:", groupData.group_code);
      const newGroup = {
        code: groupData.group_code,
        name: groupData.group_name,
        book: group.book,
      };
      console.log("Added group:", newGroup);
      setGroup(newGroup);
      setGroupStatus("inGroup");
    } catch (error) {
      console.error("Insert error:", error);
    }
  };

  const joinGroup = async (groupId) => {
    const { data, error } = await supabase
      .from("groups")
      .insert([{ group_id: groupId, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Join group error:", error);
    }
    console.log("Joined group:", data);
    setGroupStatus("inGroup");
  };

  const handleGroupCreation = async (e) => {
    e.preventDefault();
    if (group.name === "") {
      alert("Please enter a group name");
      return;
    }
    const newGroup = await createNewGroup(group);
    setGroup(newGroup);
    setGroupStatus("inGroup");
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    // Insert Into userGroups values (groupid, e.target.value)
    // if it fails, alert("Group does not exist with code" + e.target.value);
    setGroupStatus("inGroup");
  };

  return (
    <DataContext.Provider
      value={{
        group,
        setGroup,
        groupStatus,
        setGroupStatus,
        books,
        setBooks,
        selectedBook,
        setSelectedBook,
        getBooks,
        addBook,
        createNewGroup,
        joinGroup,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DataContext);
};
