/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NotificationsContext } from "../../contexts/NotificationsContext";
import { Notification } from "../../components/Notification";
import { NotificationType } from "../../types/notification";

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (notification: NotificationType) => {
    setNotifications([...notifications, notification]);
  };
  const removeNotification = (id: number) => {
    const newNotification = notifications;
    newNotification.splice(id, 1);
    setNotifications([...newNotification]);
  };

  useEffect(() => {
    const clearNotification = setTimeout(() => {
      if (notifications.length > 0) {
        const newNotifications = notifications;
        newNotifications.pop();
        setNotifications([...newNotifications]);
      }
    }, 3000);

    return () => {
      if (clearNotification) clearTimeout(clearNotification);
    };
  }, [notifications]);

  return (
    <NotificationsContext.Provider
      value={{
        addNotification,
      }}
    >
      {children}
      <div className="absolute z-50 top-5 right-5">
        {notifications?.map((notification: NotificationType, index: number) => (
          <Notification
            id={index}
            title={notification.title}
            key={index}
            type={notification.type}
            removeNotification={() => removeNotification(index)}
          >
            {notification.body}
          </Notification>
        ))}
      </div>
    </NotificationsContext.Provider>
  );
};
