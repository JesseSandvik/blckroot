import { useEffect } from "react";
import { User, useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    user && addUser(JSON.parse(user));
  }, []);

  const login = (user: User) => {
    addUser(user);
  };
  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
