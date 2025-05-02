"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useUserAuth } from "./auth-context";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { user, supabaseSignOut } = useUserAuth();
  const [groupStatus, setGroupStatus] = useState("none");
  const [personalStatus, setPersonalStatus] = useState("main");
  
  const [page, setPage] = useState("home");
  const router = useRouter();

  const handleLogOut = async () => {
    await supabaseSignOut();
    router.push("/");
  };

  return (
    <AppContext.Provider
      value={{ groupStatus, setGroupStatus, personalStatus, setPersonalStatus, page, setPage, handleLogOut }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
