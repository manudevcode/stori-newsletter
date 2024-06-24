import React from "react";
import {
  INewsletterContext,
  NewsletterContext,
} from "../../contexts/NewsletterContext";

export const useNewsletters = (): INewsletterContext => {
  return React.useContext<INewsletterContext>(NewsletterContext);
};
