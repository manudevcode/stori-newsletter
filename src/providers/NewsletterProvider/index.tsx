import { ReactElement, useEffect, useState } from "react";
import { NewsletterContext } from "../../contexts/NewsletterContext";
import { Newsletter } from "../../types/newsletter";
import api from "../../services/api";
import { NEWSLETTERS } from "../../services/api/routes";
import { useLocation } from "react-router-dom";

export const NewsLetterProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  const getNewsletters = async () => {
    const { data } = await api.get(NEWSLETTERS);
    setNewsletters(data);
    setLoading(false);
  };

  useEffect(() => {
    getNewsletters();
  }, [location.pathname]);

  return (
    <NewsletterContext.Provider
      value={{
        loading,
        newsletters,
      }}
    >
      {children}
    </NewsletterContext.Provider>
  );
};
