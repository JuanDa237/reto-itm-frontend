// ----------------------- React -----------------------
import { useEffect, useState } from "react";
// ----------------------- Libraries -----------------------
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
// ----------------------- Images -----------------------
import logo from "../assets/images/logo-home.webp";
// ----------------------- Routes -----------------------
import { links, titles } from "../routes";
// ----------------------- Components -----------------------
import SideLink from "../components/SideLink";
// ----------------------- Hooks -----------------------
import { useBasePath } from "../common/hooks/useBasePath";

function MainLayout() {
  const [open, setOpen] = useState(true);
  const menus = links;

  let path = useBasePath();

  useEffect(() => {
    // Set document title
    if (path) document.title = titles[path];
  }, [path]);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72 left-0" : "w-20 left-[-17%]"
        } bg-primary z-50 h-screen p-5 pt-8 duration-300 absolute md:relative md:left-0`}
      >
        <div
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
	   border-2 rounded-full bg-white ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon
            className="relative text-gray-500 left-1/2 -translate-x-1/2"
            icon={faAngleLeft}
          ></FontAwesomeIcon>
        </div>

        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`duration-500 max-h-9 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "hidden"
            }`}
          >
            RETO ITM
          </h1>
        </div>
        <ul className="pt-6">
          {menus.map(
            (link, index) =>
            <SideLink linkInfo={link} open={open} key={index} />
          )}
        </ul>
      </div>
      <div className="h-screen overflow-x-hidden flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
