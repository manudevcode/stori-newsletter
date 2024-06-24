import React from "react";
import { NotificationType } from "../../types/notification";

export interface NotificationsContext {
  addNotification: (notification: NotificationType) => void;
}

export const NotificationsContext = React.createContext<NotificationsContext>({
  addNotification: () => {},
});
