"use client";
import { useUserAuth } from "./auth-context";
import { useApp } from "./app-context";
import { useContext, createContext, useState, useEffect } from "react";
import supabase from "./supabase";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const { user } = useUserAuth();
  const [group, setGroup] = useState({
    code: "",
    name: "",
    book: null,
  });
  const [] = useState("none");
  const { groupStatus, setGroupStatus, personalStatus, setPersonalStatus } =
    useApp();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [groups, setGroups] = useState([]);
  const [progress, setProgress] = useState([]);
  const [showGroupProgress, setShowGroupProgress] = useState(false);
  const [notes, setNotes] = useState([]);
  const [personalBook, setPersonalBook] = useState(null);
  const [personalBooks, setPersonalBooks] = useState([]);
  const [personalNotes, setPersonalNotes] = useState([]);

  // Create Group Methods -------------------------------------
  const getBooks = async () => {
    let { data, error } = await supabase.from("books").select("*");
    if (error) {
      console.error("Error fetching books:", error);
    }
    setBooks(data);
  };

  const addBook = async (book, type) => {
    let insertBook = {
      title: book.title,
      author: book.author,
      num_of_pages: book.numOfPages,
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
    if (type === "group") {
      setGroup({ ...group, book: newBook });
      console.log("Selected book:", group.book);
      return;
    }
    if (type === "personal") {
      updateProgress(0, null, newBook.book_id, true);
    }
    console.log("Added tracked book:", newBook);
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
    try {
      let { data, error } = await supabase.rpc("join_group", {
        arg_group_code: group.code.trim(),
        arg_user_id: user.id,
        arg_user_name: user.user_metadata.full_name,
      });
      if (error) {
        throw error;
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
      alert("Joined Group");
      setGroupStatus("inGroup");
    } catch (error) {
      console.log("Join group error:", error);
      alert("Join group error:", error.message);
    }
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
      `Loaded group: ${joinedGroup.code}\n${joinedGroup.name}\n${joinedGroup.book.title} by ${joinedGroup.book.author}`
    );
  };

  // Group Overview Methods -------------------------------------
  const getGroupMemberProgress = async () => {
    const { data, error } = await supabase.rpc("get_group_progress", {
      arg_group_code: group.code,
      arg_book_id: group.book.book_id,
    });

    if (error) {
      console.error("Error fetching group progress:", error);
      return;
    }

    const groupMembers = data.map((entry) => ({
      name: entry.member_name,
      currentPage: entry.current_pg,
      date: entry.date,
    }));

    setProgress(groupMembers);
  };

  // Update Progress Method -------------------------------------
  const updateProgress = async (newPage, note, updateId, type) => {
    const bookId = type === "group" ? group.book.book_id : updateId;
    const bookType = type === "group" ? false : true;
    let { error } = await supabase.rpc("add_progress", {
      arg_book_id: bookId,
      arg_new_page: newPage,
      arg_note: note,
      arg_user_id: user.id,
      arg_book_type: bookType,
    });
    if (error) console.error(error);
    else {
      console.log("Updated progress");
    }
  };

  // Load Group Notes Method -------------------------------------
  const getGroupNotes = async () => {
    let { data, error } = await supabase.rpc("get_group_notes", {
      arg_group_code: group.code,
    });
    if (error) {
      console.error("Error fetching group notes:", error);
    } else console.log(data);

    const groupNotes = data.map((member) => {
      return {
        member_name: member.member_name,
        current_pg: member.current_pg,
        date: new Date(member.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
        note: member.note,
      };
    });

    console.log("Fetched Notes:", groupNotes);

    setNotes(groupNotes);
  };

  // Personal Books/Progress Method -------------------------------------
  const getPersonalBooks = async () => {
    let { data, error } = await supabase.rpc("get_personal_books", {
      arg_user_id: user.id,
    });
    if (error) {
      console.error(error);
      return false;
    } else {
      const returnedBooks = data.map((book) => {
        return {
          book_id: book.book_id,
          title: book.title,
          author: book.author,
          num_of_pages: book.num_of_pages,
          currentPage: book.current_pg,
          note: book.note,
          date: new Date(book.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        };
      });
      console.log("Fetched personal books:", returnedBooks);
      setPersonalBooks(returnedBooks);
      return true;
    }
  };

  // Personal Notes Method -------------------------------------
  const getPersonalNotes = async (bookId) => {
    let { data, error } = await supabase.rpc("get_personal_notes", {
      arg_book_id: bookId,
      arg_user_id: user.id,
    });
    if (error) {
      console.error("Error fetching personal notes:", error);
    } else console.log(data);

    const returnedNotes = data.map((note) => {
      return {
        current_pg: note.current_pg,
        date: new Date(note.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
        note: note.note,
      };
    });
    console.log("Fetched Personal Notes:", returnedNotes);
    setPersonalNotes(returnedNotes);
  };

  useEffect(() => {
    const handleInitialLoad = () => {
      if (window.history.state?.isBookClubSubpage) {
        window.history.replaceState(null, "");
        setGroupStatus("none");
      }
    };

    handleInitialLoad();
  }, [setGroupStatus]);

  useEffect(() => {
    const handleInitialLoad = () => {
      if (window.history.state?.isPersonalSubpage) {
        window.history.replaceState(null, "");
        setPersonalStatus("main");
      }
    };

    handleInitialLoad();
  }, [setPersonalStatus]);

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
        updateProgress,
        getGroupNotes,
        notes,
        personalBook,
        setPersonalBook,
        setPersonalStatus,
        personalStatus,
        personalBooks,
        getPersonalBooks,
        getPersonalNotes,
        personalNotes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DataContext);
};
