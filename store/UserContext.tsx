"use client";

import { Profile } from "@/types/profile";
import { createContext, useContext } from "react";

export const UserContext = createContext<Profile>({
  username: "Hari Maurya",
  jobTitle: "Frontend engineer",
});

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserContextProvider({
  children,
  value,
}: Readonly<{
  children: React.ReactNode;
  value: Profile;
}>) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
