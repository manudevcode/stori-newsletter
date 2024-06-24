import React from "react";
import { User } from "../../types/user";

export interface AuthContextType {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
});
