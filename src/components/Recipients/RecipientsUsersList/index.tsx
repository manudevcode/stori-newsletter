import { useRecipients } from "../../../hooks/useRecipients";
import { Recipient, UserRecipientList } from "../../../types/recipient";
import { EmptyState } from "../../EmptyState";
import { Loader } from "../../Loader";

export const RecipientsUsersList = () => {
  const { recipientsUsers, loading } = useRecipients();
  return (
    <Loader loading={loading}>
      {recipientsUsers?.length == 0 ? (
        <EmptyState
          title="There's no recipients users yet"
          subtitle="Create your first recipient list"
        />
      ) : (
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Subscribed to
                </th>
              </tr>
            </thead>
            <tbody>
              {recipientsUsers?.map((recipient: Recipient) => (
                <tr className=" border-b" key={recipient._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {recipient?.email}
                  </th>
                  <td className="px-6 py-4">
                    {(recipient?.recipientsList as UserRecipientList)?.map(
                      ({ name }) => (
                        <span className="rounded-lg bg-primary py-1 px-2 text-secondary m-1">
                          {name}
                        </span>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Loader>
  );
};
