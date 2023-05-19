// ----------------------- React -----------------------
import { Navigate, RouteObject } from "react-router";
// ----------------------- Icons -----------------------
import {
  IconDefinition,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
// ----------------------- Layout/Common -----------------------
import MainLayout from "./layouts/MainLayout";
import ModuleChildWrapper from "./components/ModuleChildWrapper";
// ----------------------- Pages -----------------------
import CategoryList from "./pages/admin/Category/CategoryList";
// ----------------------- Forms -----------------------
import CategoryForm from "./pages/admin/Category/CategoryForm";
import ClientList from "./pages/admin/Client/ClientList";
import ClientForm from "./pages/admin/Client/ClientForm";
import ProductList from "./pages/admin/Product/ProductList";
import ProductForm from "./pages/admin/Product/ProductForm";

// ----------------------- Interfaces -----------------------
interface Model {
  title: string;
  component: JSX.Element;
  form?: JSX.Element;
  route: string;
  icon: IconDefinition;
}

interface TitleMap {
  [key: string]: string;
}

export interface LinkInfo {
  title: string;
  icon: IconDefinition;
  path: string;
}

interface BreadcrumbMap {
  [key: string]: BreadcrumbInfo;
}

export interface BreadcrumbInfo {
  moduleTitle: string;
  childTitle: string;
}

const adminPath = "/admin";

// From this object the routes, titles, and sidebar links will be maked
export const models: Model[] = [
  {
    route: "/category",
    title: "Categorías",
    icon: faListUl,
    component: <CategoryList />,
    form: <CategoryForm />,
  },
  {
    route: "/client",
    title: "Clientes",
    icon: faListUl,
    component: <ClientList />,
    form: <ClientForm />,
  },
  {
    route: "/product",
    title: "Productos",
    icon: faListUl,
    component: <ProductList />,
    form: <ProductForm />,
  },
];

// Get the routes for the react router
function getRoutes(): RouteObject {
  let routes: RouteObject = {
    path: adminPath,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={adminPath + models[0].route} />,
      },
      {
        index: false,
        element: <ModuleChildWrapper />,
        children: [],
      },
    ],
  };

  for (const model of models) {
    if (routes.children) {
      routes.children[1].children?.push({
        path: adminPath + model.route,
        element: model.component,
      });

      if (model.form) {
        routes.children[1].children?.push({
          path: adminPath + model.route + "/add",
          element: model.form,
        });

        routes.children[1].children?.push({
          path: adminPath + model.route + "/edit/:id",
          element: model.form,
        });
      }
    }
  }

  return routes;
}

export const routesMap = getRoutes();

// Get the a map to get the title of a path, path: title
function getTitles(): TitleMap {
  const titles: TitleMap = {};

  let postTitle = " | RETO ITM";

  for (const model of models) {
    titles[adminPath + model.route] = model.title + postTitle;
    titles[adminPath + model.route + "/add"] =
      "Añadir " + model.title + postTitle;
    titles[adminPath + model.route + "/edit"] =
      "Editar " + model.title + postTitle;
  }

  return titles;
}

export const titles = getTitles();

// Get an array of the links to the paths
function getLinks(): LinkInfo[] {
  const links: LinkInfo[] = [];

  for (const model of models) {
    links.push({
      title: model.title,
      icon: model.icon,
      path: adminPath + model.route,
    });
  }

  return links;
}

export const links = getLinks();

// Get a map to get the info of a path, path: info
function getBreadcrumbInfo(): BreadcrumbMap {
  const titles: BreadcrumbMap = {};

  for (const model of models) {
    titles[adminPath + model.route] = {
      moduleTitle: "Admin",
      childTitle: model.title,
    };

    titles[adminPath + model.route + "/add"] = {
      moduleTitle: model.title,
      childTitle: "Añadir " + model.title,
    };

    titles[adminPath + model.route + "/edit"] = {
      moduleTitle: model.title,
      childTitle: "Editar " + model.title,
    };
  }

  return titles;
}

export const breadcrumb = getBreadcrumbInfo();
