import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthReducer } from "../app/authReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  children: ReactNode;
};

export interface User {
  id: string;
  email: string;
  authToken?: string;
}

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: { id: "", email: "" },
});

export const AuthProvider = (props: Props) => {
  const [{ user }] = useReducer(AuthReducer, {
    isError: false,
    isLoaded: false,
    isLoading: false,
    user: { id: "", email: "" },
  });
  const { setItem } = useLocalStorage();

  useEffect(() => {
    user && setItem("user", JSON.stringify(user));
  }, [setItem, user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
