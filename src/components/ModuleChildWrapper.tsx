// ----------------------- React -----------------------
import { useEffect, useState } from "react";
// ----------------------- Libraries -----------------------
import { useLocation, Outlet, useParams } from "react-router-dom";
// ----------------------- Routes -----------------------
import { breadcrumb, BreadcrumbInfo } from "../routes";

function ModuleChildWrapper() {
  const location = useLocation();
  const params = useParams();

  const useBasePath = () => {
    let path = location.pathname;

    Object.values(params).forEach(() => {
      path = path.slice(0, location.pathname.lastIndexOf("/"));
    });

    return path;
  };

  useEffect(() => {
    let path = useBasePath();
    setInfo(breadcrumb[path]);
  }, [location]);

  const [info, setInfo] = useState<BreadcrumbInfo>({
    childTitle: "",
    moduleTitle: "",
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between my-4">
        <div className="text-gray-600 font-bold	uppercase">
          {info.childTitle}
        </div>
        <div className="text-gray-500 text-sm flex align-bottom">
          <p>
            {info.moduleTitle} <span className="text-gray-400">/</span>{" "}
            {info.childTitle}
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded">
        <Outlet />
      </div>
    </div>
  );
}

export default ModuleChildWrapper;
