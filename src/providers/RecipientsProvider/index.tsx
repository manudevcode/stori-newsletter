import { ReactElement, useEffect, useState } from "react";
import api from "../../services/api";
import { RECIPIENTS, RECIPIENTS_USERS } from "../../services/api/routes";
import { Recipient, RecipientList } from "../../types/recipient";
import { RecipientsListContext } from "../../contexts/RecipientsListContext";

export const RecipientsProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [loading, setLoading] = useState(true);
  const [recipientsList, setRecipientsLists] = useState<RecipientList[]>([]);
  const [recipientsUsers, setRecipientsUsers] = useState<Recipient[]>([]);

  const getRecipientsLists = async () => {
    const { data } = await api.get(RECIPIENTS);
    setRecipientsLists(data);
    setLoading(false);
  };

  const getRecipientsUsers = async () => {
    const { data } = await api.get(RECIPIENTS_USERS);
    setRecipientsUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getRecipientsLists();
    getRecipientsUsers();
  }, []);

  return (
    <RecipientsListContext.Provider
      value={{
        loading,
        recipientsUsers,
        recipientsList,
      }}
    >
      {children}
    </RecipientsListContext.Provider>
  );
};
