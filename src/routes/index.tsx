import { Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { RecipientsListForm } from "../components/Recipients/RecipientListForm";
import { RecipientsList } from "../components/Recipients/RecipientsList";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { Newsletter } from "../pages/Newsletter";
import { NotFound } from "../pages/NotFound";
import { Recipients } from "../pages/Recipients";
import { RecipientsUsersList } from "../components/Recipients/RecipientsUsersList";
import { Unsubscribe } from "../pages/Unsubscribe";
import { NewsletterForm } from "../components/Nresletters/NewsletterForm";
import { NewslettersList } from "../components/Nresletters/NewslettersList";

export const baseRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unsubscribe/:email",
    element: <Unsubscribe />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <div>Dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: "/newsletter",
        element: (
          <PrivateRoute>
            <Newsletter />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <NewslettersList />,
          },
          {
            path: "new",
            element: <NewsletterForm />,
          },
        ],
      },
      {
        path: "/recipients",
        element: (
          <PrivateRoute>
            <Recipients />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="lists" />,
          },
          {
            path: "lists",
            element: <RecipientsList />,
          },
          {
            path: "users",
            element: <RecipientsUsersList />,
          },
          {
            path: "new",
            element: <RecipientsListForm />,
          },
        ],
      },
    ],
  },
];
