import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { NavLink, Outlet } from "react-router-dom";
import { NewsLetterProvider } from "../../providers/NewsletterProvider";

export const Newsletter = () => {
  return (
    <NewsLetterProvider>
      <div>
        <div className="h-14 rounded-full shadow-md flex px-2 justify-between items-center border border-gray-50]">
          <div className="mx-2 font-medium text-primary">
            List of newsletters
          </div>
          <div>
            <NavLink
              to="/newsletter/new"
              className="button rounded-full text-secondary flex items-center hover:shadow-md justify-between"
            >
              <span className="flex justify-center w-full">
                <span>New</span>
              </span>
              <PlusCircleIcon className="h-10 text-white" />
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </NewsLetterProvider>
  );
};
