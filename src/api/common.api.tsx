export interface QueryParams {
  limit: number;
  offset: number;
  q?: string;
}

export function getApi(): string {
  return import.meta.env.VITE_API;
}

export function getQueryString(queryParams: QueryParams) {
  if (!queryParams.q) delete queryParams.q;
  return "?" + new URLSearchParams(queryParams as any);
}

export function getAuthHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getFilePath(filePath: string) {
  return getApi() + "/file/" + filePath;
}
