import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { User } from "../../api";

type AuthContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    user && setUser(JSON.parse(user));
  }, [getItem]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
