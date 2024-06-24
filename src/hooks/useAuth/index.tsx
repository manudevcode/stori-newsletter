import React from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

export const useAuth = (): AuthContextType => {
  return React.useContext<AuthContextType>(AuthContext);
};
