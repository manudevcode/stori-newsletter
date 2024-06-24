import { useContext } from "react";
import { NotificationsContext } from "../../contexts/NotificationsContext";

export const useNotify = () => {
  const { addNotification } = useContext(NotificationsContext);
  return addNotification;
};
