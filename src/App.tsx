import { useRoutes } from "react-router-dom";
import { baseRoutes } from "./routes";
import { useEffect } from "react";
import api from "./services/api";
import { useNotify } from "./hooks/useNotify";
import { NotificationTypes } from "./constants/notification";

function App() {
  const routes = useRoutes(baseRoutes);
  const addNotification = useNotify();

  const apiErrorInterceptor = (message: string) => {
    addNotification({
      title: "Error",
      body: message,
      type: NotificationTypes.error,
    });
  };

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const {
          message = "An error has occurred",
          response: { data },
        } = error;
        apiErrorInterceptor(data?.message ?? message);
        return Promise.reject(error);
      }
    );
  });

  return <>{routes}</>;
}

export default App;
