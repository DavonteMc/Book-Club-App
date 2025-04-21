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
  const [groups, setGroups] = useState([]);
  const { user } = useUserAuth();
  const [progress, setProgress] = useState([]);
  const [showGroupProgress, setShowGroupProgress] = useState(false);

  // Create Group Methods -------------------------------------
  const getBooks = async () => {
    let { data, error } = await supabase.from("books").select("*");
    if (error) {
      console.error("Error fetching books:", error);
    }
    setBooks(data);
  };

  const addBook = async (book) => {
    let insertBook = {
      title: book.title,
      author: book.author,
      num_of_pages: book.num_of_pages,
    };
    let { data, error } = await supabase
      .from("books")
      .insert([insertBook])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      alert("Error adding book");
      return;
    }
    console.log("Added book:", data);
    const newBook = data ?? null;
    setGroup({ ...group, book: newBook });
  };

  const createNewGroup = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase.rpc("new_group", {
      arg_book_id: group.book.book_id,
      arg_group_name: group.name,
      arg_user_name: user.user_metadata.full_name,
      arg_user_id: user.id,
    });
    if (error) {
      console.error(error);
      alert("Error creating group");
      return;
    } else console.log(data);

    setGroup({ ...group, code: data });
    console.log(`Added group: ${group.code}\n${group.name}\n${group.book}`);
    alert(`Created group: ${group.code}\n${group.name}\n${group.book}`);
    setGroupStatus("inGroup");
  };

  // Join Group Method -------------------------------------
  const joinGroup = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase.rpc("join_group", {
      arg_group_code: group.code.trim(),
      arg_user_id: user.id,
      arg_user_name: user.user_metadata.full_name,
    });

    if (error) {
      console.error("Join group error:", error);
      alert("Join group error:", error);
      return;
    }
    console.log("Joined group:", data);
    const book = {
      book_id: data.book_id,
      title: data.title,
      author: data.author,
      num_of_pages: data.num_of_pages,
    };
    const joinedGroup = {
      code: group.code,
      name: data.group_name,
      book: book,
    };
    setGroup(joinedGroup);
    console.log(
      `Joined group: ${joinedGroup.code}\n${joinedGroup.name}\n${joinedGroup.book.title} by ${joinedGroup.book.author}`
    );
    8;
    alert(
      `Joined group: ${joinedGroup.code}\n${joinedGroup.name}\n${joinedGroup.book.title} by ${joinedGroup.book.author}`
    );
    setGroupStatus("inGroup");
  };

  // Load Group Methods -------------------------------------
  const getGroups = async () => {
    let { data, error } = await supabase
      .from("group_members")
      .select(
        `
      groups (
        group_code,
        group_name
      )
    `
      )
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching groups:", error);
    }
    console.log("Fetched groups:", data);
    setGroups(data);
  };

  const assignGroup = async (assignedGroup) => {
    let { data, error } = await supabase
      .from("group_books")
      .select(
        `
      books (
        book_id,
        title,
        author,
        num_of_pages
      )
    `
      )
      .eq("group_code", assignedGroup.code)
      .single();

    if (error) {
      console.error("Error fetching groups:", error);
    }

    console.log("Assigned Group:", data);
    const book = {
      book_id: data.books.book_id,
      title: data.books.title,
      author: data.books.author,
      num_of_pages: data.books.num_of_pages,
    };
    const joinedGroup = {
      code: assignedGroup.code,
      name: assignedGroup.name,
      book: book,
    };
    setGroup(joinedGroup);
    setGroupStatus("inGroup");
    console.log(
      `Joined group: ${joinedGroup.code}\n${joinedGroup.name}\n${joinedGroup.book.title} by ${joinedGroup.book.author}`
    );
  };

  // Group Overview Methods -------------------------------------
  const getGroupMembers = async (groupCode) => {
    let { data, error } = await supabase
      .from("group_members")
      .select("user_id")
      .eq("group_code", groupCode);

    if (error) {
      console.error("Error fetching group members:", error);
      return null;
    }
    console.log("Fetched group members:", data);
    return data;
  };

  const getGroupMemberProgress = async () => {
    let members = await getGroupMembers(group.code);
    if (members === null) return;

    const groupMembers = [];

    for (let i = 0; i < members.length; i++) {
      let { data, error } = await supabase.rpc("get_member_progress", {
        arg_book_id: group.book.book_id,
        arg_user_id: members[i].user_id,
      });
      if (error) {
        console.error("Error fetching group member progress:", error);
      } else {
        console.log("Fetched group member progress:", data);
        let member = {
          name: data.member_name,
          currentPage: data.current_pg,
          date: data.date,
        };
        console.log("Member progress:", member);
        groupMembers.push(member);
      }
    }
    setProgress(groupMembers);
  };

  // Update Progress Methods -------------------------------------
  const updateProgress = async (newPage, note) => {
    let { error } = await supabase.rpc("add_progress", {
      arg_book_id: group.book.book_id,
      arg_new_page: newPage,
      arg_note: note,
      arg_user_id: user.id,
    });
    if (error) console.error(error);
    else {
      console.log("Updated progress");
    }
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
        getGroups,
        groups,
        assignGroup,
        getGroupMemberProgress,
        showGroupProgress,
        setShowGroupProgress,
        setProgress,
        progress,
        updateProgress
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DataContext);
};
