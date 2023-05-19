// ----------------------- Libraries -----------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
// ----------------------- Interfaces -----------------------
import { LinkInfo } from "../routes";

interface SideLinkProps {
  linkInfo: LinkInfo;
  open: boolean;
}

function SideLink({ linkInfo, open }: SideLinkProps) {
  let baseClass =
    "flex rounded-md p-2 mb-1 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4";

  return (
    <NavLink
      className={({ isActive }) => {
        let base = baseClass + (!open ? " justify-center" : "");
        return isActive ? base + " bg-light-white" : base;
      }}
      to={linkInfo.path}
    >
      <FontAwesomeIcon icon={linkInfo.icon}></FontAwesomeIcon>
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {linkInfo.title}
      </span>
    </NavLink>
  );
}

export default SideLink;
