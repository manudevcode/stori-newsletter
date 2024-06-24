import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/Navbar";

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="bg-gray-50 h-full w-full">
        <div className="mx-auto w-4/6 pt-0 md:pt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};
