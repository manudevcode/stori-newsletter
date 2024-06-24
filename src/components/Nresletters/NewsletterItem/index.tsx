import { useMemo } from "react";
import { Newsletter } from "../../../types/newsletter";

export const NewsletterItem = ({ newsletter }: { newsletter: Newsletter }) => {
  const scheduledAt = useMemo(
    () =>
      new Intl.DateTimeFormat("es-MX", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(newsletter?.date)),
    [newsletter]
  );

  return (
    <tr className=" border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-primary whitespace-nowrap "
      >
        {newsletter?.title}
      </th>
      <td className="px-6 py-4 text-primary">
        {newsletter?.recipientList?.name}
      </td>
      <td className="px-6 py-4">
        {newsletter?.date && (
          <span className="bg-primary p-2 rounded-lg text-secondary">
            Scheduled to: {scheduledAt}
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        {newsletter?.sent ? (
          <span className="bg-secondary p-2 rounded-lg text-primary">Sent</span>
        ) : (
          <span className=" bg-yellow-400 p-2 rounded-lg text-primary">No</span>
        )}
      </td>
      <td className="px-6 py-4">
        {newsletter?.canceled ? (
          <span className="bg-red-300 p-2 rounded-lg text-primary">
            Canceled
          </span>
        ) : (
          <span className="bg-secondary p-2 rounded-lg text-primary">No</span>
        )}
      </td>
    </tr>
  );
};
