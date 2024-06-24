import React from "react";
import { Newsletter } from "../../types/newsletter";

export interface INewsletterContext {
  loading: boolean;
  newsletters: Newsletter[] | undefined;
}

export const NewsletterContext = React.createContext<INewsletterContext>({
  loading: false,
  newsletters: undefined,
});
