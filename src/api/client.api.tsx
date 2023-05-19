import {
  getApi,
  getQueryString,
  QueryParams,
} from "./common.api";

const clientApi = getApi() + "/client";

const getAll = async (queryParams: QueryParams) => {
  let res = await fetch(clientApi + getQueryString(queryParams), {
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

  let res = await fetch(`${clientApi}/${id}`, {
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

  let res = await fetch(clientApi, {
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

  let res = await fetch(`${clientApi}/${id}`, {
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

  let res = await fetch(`${clientApi}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  let data = await res.json();

  if (!res.ok) {
    throw Error(data.message || res.statusText);
  }

  return data;
};

export const ClientApi = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
};
