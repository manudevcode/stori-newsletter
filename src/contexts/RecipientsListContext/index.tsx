import React from "react";
import { Recipient, RecipientList } from "../../types/recipient";

export interface IRecipientsListContext {
  loading: boolean;
  recipientsUsers: Recipient[] | undefined;
  recipientsList: RecipientList[] | undefined;
}

export const RecipientsListContext =
  React.createContext<IRecipientsListContext>({
    loading: false,
    recipientsUsers: undefined,
    recipientsList: undefined,
  });
