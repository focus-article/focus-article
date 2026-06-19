import axios from "axios";

const publicEnv = typeof process !== "undefined" ? process.env : {};
const fallbackApiPort =
  publicEnv.BUN_PUBLIC_SERVER_API_PORT ??
  publicEnv.BUN_PUBLIC_API_PORT ??
  "3001";
const fallbackApiHost = publicEnv.BUN_PUBLIC_API_HOST ?? "localhost";
const fallbackApiUrl =
  publicEnv.BUN_PUBLIC_API_URL ??
  `http://${fallbackApiHost}:${fallbackApiPort}`;

let apiUrlPromise;

const getApiUrl = () => {
  if (apiUrlPromise) {
    return apiUrlPromise;
  }

  if (typeof fetch === "undefined") {
    apiUrlPromise = Promise.resolve(fallbackApiUrl);
    return apiUrlPromise;
  }

  apiUrlPromise = fetch("/env.json")
    .then((res) => (res.ok ? res.json() : null))
    .then((config) => config?.apiUrl ?? fallbackApiUrl)
    .catch(() => fallbackApiUrl);

  return apiUrlPromise;
};

export const getArticles = async (params) => {
  const apiUrl = await getApiUrl();
  return axios
    .get(`${apiUrl}/articles?size=-1`, { params })
    .then((res) => res.data?.data);
};

export const getTags = async () => {
  const apiUrl = await getApiUrl();
  return axios.get(`${apiUrl}/tags`).then((res) => res.data);
};

export const saveArticle = async (article) => {
  const apiUrl = await getApiUrl();
  return axios
    .post(`${apiUrl}/articles`, article)
    .then((res) => res.data);
};

export const updateArticle = async (id, changes) => {
  const apiUrl = await getApiUrl();
  return axios
    .patch(`${apiUrl}/articles/${id}`, changes)
    .then((res) => res.data);
};

export const remove = async (id) => {
  const apiUrl = await getApiUrl();
  return axios
    .delete(`${apiUrl}/articles/${id}`)
    .then((res) => res.data);
};

export const extractArticleMetadata = async (url) => {
  const apiUrl = await getApiUrl();
  return axios
    .get(`${apiUrl}/extractor`, { params: { url } })
    .then((res) => res.data);
};
