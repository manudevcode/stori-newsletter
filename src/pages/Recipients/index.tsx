import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { NavLink, Outlet } from "react-router-dom";
import { RecipientsProvider } from "../../providers/RecipientsProvider";

export const Recipients = () => {
  return (
    <RecipientsProvider>
      <div>
        <div className="h-14 rounded-full shadow-md flex px-2 justify-between items-center border border-gray-50]">
          <div className="mx-2 font-medium text-primary flex space-x-1">
            <NavLink
              to="/recipients/lists"
              className={({ isActive }) =>
                `h-10 px-2 py-2 transition-all text-sm rounded-full text-primary flex items-center justify-between hover:bg-green-100 ${
                  isActive ? "bg-green-100" : "bg-transparent"
                }`
              }
            >
              <span className="flex justify-center w-full">
                <span>Recipients List </span>
              </span>
            </NavLink>
            <NavLink
              to="/recipients/users"
              className={({ isActive }) =>
                `h-10 px-2 py-2 transition-all text-sm rounded-full text-primary flex items-center justify-between hover:bg-green-100 ${
                  isActive ? "bg-green-100" : "bg-transparent"
                }`
              }
            >
              <span className="flex justify-center w-full">
                <span>Recipients</span>
              </span>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/recipients/new"
              className="button rounded-full text-secondary flex items-center justify-between"
            >
              <span className="flex justify-center w-full">
                <span>New List</span>
              </span>
              <PlusCircleIcon className="h-10 text-white" />
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </RecipientsProvider>
  );
};
