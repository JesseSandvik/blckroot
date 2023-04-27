import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  children: ReactNode;
};

interface User {
  id: string;
  email: string;
  authToken?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const { setItem } = useLocalStorage();

  useEffect(() => {
    user && setItem("user", JSON.stringify(user));
  }, [setItem, user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
