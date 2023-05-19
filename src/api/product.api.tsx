import {
  getApi,
  getQueryString,
  QueryParams,
} from "./common.api";

const productApi = getApi() + "/product";

const getAll = async (queryParams: QueryParams) => {
  let res = await fetch(productApi + getQueryString(queryParams), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data = await res.json();

  console.log(data);

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

const getOne = async (id: string) => {

  let res = await fetch(`${productApi}/${id}`, {
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

  let res = await fetch(productApi, {
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

  let res = await fetch(`${productApi}/${id}`, {
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

  let res = await fetch(`${productApi}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

export const ProductApi = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
};
