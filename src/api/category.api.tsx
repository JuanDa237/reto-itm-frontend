import {
  getApi,
  getAuthHeader,
  getQueryString,
  QueryParams,
} from "./common.api";

const categoryApi = getApi() + "/category";

const getAll = async (queryParams: QueryParams) => {
  let res = await fetch(categoryApi + getQueryString(queryParams), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

const getOne = async (id: string) => {

  let res = await fetch(`${categoryApi}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

const create = async (payload: any) => {

  let res = await fetch(categoryApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

const edit = async (id: string, payload: any) => {

  let res = await fetch(`${categoryApi}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

const deleteOne = async (id: string) => {

  let res = await fetch(`${categoryApi}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

export const CategoryApi = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
};
