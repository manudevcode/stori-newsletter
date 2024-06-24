import { useRecipients } from "../../../hooks/useRecipients";
import { RecipientList } from "../../../types/recipient";
import { EmptyState } from "../../EmptyState";
import { Loader } from "../../Loader";

export const RecipientsList = () => {
  const { recipientsList, loading } = useRecipients();
  return (
    <Loader loading={loading}>
      {recipientsList?.length == 0 ? (
        <EmptyState
          title="There's no recipients yet"
          subtitle="Create your first recipient list"
        />
      ) : (
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Initial subscribers
                </th>
                <th scope="col" className="px-6 py-3">
                  Current subscribers
                </th>
              </tr>
            </thead>
            <tbody>
              {recipientsList?.map((recipientList: RecipientList) => (
                <tr className=" border-b" key={recipientList._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {recipientList?.name}
                  </th>
                  <td className="px-6 py-4">{recipientList?.description}</td>
                  <td className="px-6 py-4">
                    {recipientList?.initialSubscribers}
                  </td>
                  <td className="px-6 py-4">
                    {recipientList?.currentSubscribers}
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
