import React from "react";
import {
  IRecipientsListContext,
  RecipientsListContext,
} from "../../contexts/RecipientsListContext";

export const useRecipients = (): IRecipientsListContext => {
  return React.useContext<IRecipientsListContext>(RecipientsListContext);
};
