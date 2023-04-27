import { createContext, ReactNode, useEffect, useState } from "react";

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

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
