import { DocumentMagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="w-full text-center py-10">
      <DocumentMagnifyingGlassIcon className="h-10 text-gray-600  mx-auto" />
      <h1 className="text-2xl text-gray-600 ">{title}</h1>
      <h2 className="text-1xl text-gray-600 ">{subtitle}</h2>
    </div>
  );
};
