import { useNewsletters } from "../../../hooks/useNewsletters";
import { Newsletter } from "../../../types/newsletter";
import { EmptyState } from "../../EmptyState";
import { Loader } from "../../Loader";
import { NewsletterItem } from "../NewsletterItem";

export const NewslettersList = () => {
  const { newsletters, loading } = useNewsletters();
  return (
    <Loader loading={loading}>
      {newsletters?.length == 0 ? (
        <EmptyState
          title="There's no newsletters yet"
          subtitle="Create your first newsletter"
        />
      ) : (
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Recipients list
                </th>
                <th scope="col" className="px-6 py-3">
                  Scheduled
                </th>
                <th scope="col" className="px-6 py-3">
                  Sent
                </th>
                <th scope="col" className="px-6 py-3">
                  Canceled
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {newsletters?.map((newsletter: Newsletter) => (
                <NewsletterItem key={newsletter._id} newsletter={newsletter} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Loader>
  );
};
