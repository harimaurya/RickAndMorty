import { UserContext } from "./UserContext";

const mockUser = {
  username: "testUser",
  jobTitle: "Software Developer",
};

export const MockUserContextProvider = ({
  children,
  value = mockUser,
}: {
  children: React.ReactNode;
  value?: typeof mockUser;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
