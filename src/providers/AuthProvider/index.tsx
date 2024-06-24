import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN, USER } from "../../constants/local-storage";
import { AuthContext } from "../../contexts/AuthContext";
import { User } from "../../types/user";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  const validateSession = async () => {
    const token = localStorage.getItem(TOKEN);
    const userData = JSON.parse(localStorage.getItem(USER) ?? "{}");
    setUser(userData);

    if (!token) {
      setLoading(false);

      if (location.pathname.includes("unsubscribe")) return;

      return navigate("/login");
    }

    setLoading(false);
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {!loading && <>{children}</>}
    </AuthContext.Provider>
  );
};
