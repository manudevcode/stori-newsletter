import { ReactElement } from "react";
import { NotificationTypes } from "../constants/notification";

export type NotificationType = {
  type: NotificationTypes;
  title: string;
  body: string | ReactElement;
};
