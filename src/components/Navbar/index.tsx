import {
  ChartBarIcon,
  InboxIcon,
  NewspaperIcon,
} from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-primary border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <div className="flex">
          <NavLink
            to="/"
            className="mx-2  font-medium flex items-center text-white"
          >
            <span>Stori Newsletter</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `mx-2 font-light flex items-center ${
                isActive ? "text-secondary" : "text-white"
              }`
            }
          >
            <span>Dashboard</span>
            <span>
              <ChartBarIcon className="h-5 ml-1" />
            </span>
          </NavLink>

          <NavLink
            to="/newsletter"
            className={({ isActive }) =>
              `mx-2 font-light flex items-center ${
                isActive ? "text-secondary" : "text-white"
              }`
            }
          >
            <span>Newsletter</span>
            <span>
              <NewspaperIcon className="h-5 ml-1" />
            </span>
          </NavLink>
          <NavLink
            to="/recipients"
            className={({ isActive }) =>
              `mx-2 font-light flex items-center ${
                isActive ? "text-secondary" : "text-white "
              }`
            }
          >
            <span>Recipients</span>
            <span>
              <InboxIcon className="h-5 ml-1" />
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
