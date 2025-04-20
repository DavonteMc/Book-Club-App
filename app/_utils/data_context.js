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
      num_of_pages: book.num_of_pages,
    };
    const { data, error } = await supabase
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

    let { data, error } = await supabase.rpc("new_group_cf", {
      arg_book_id: group.book.book_id,
      arg_group_name: group.name,
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

  const joinGroup = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase.rpc("join_group_cf", {
      arg_group_code: group.code.trim(),
      arg_user_id: user.id,
    });

    if (error) {
      console.error("Join group error:", error);
      alert("Join group error:", error);
      return;
      // Return the error message for use on the page
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

  const getGroups = async () => {
    const { data, error } = await supabase
      .from("group_members")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching groups:", error);
    }

    if (data.length === 0) {
      return;
    }
    console.log("Fetched groups:", data);

    // const groupIds = data.map((group) => group.group_code);
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
