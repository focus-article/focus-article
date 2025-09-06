import axios from "axios";

export const getArticles = (params) => {
  return axios
    .get("http://localhost:3001/articles?size=-1", { params })
    .then((res) => res.data?.data);
};

export const getTags = () => {
  return axios.get("http://localhost:3001/tags").then((res) => res.data);
};

export const saveArticle = (article) => {
  return axios
    .post("http://localhost:3001/articles", article)
    .then((res) => res.data);
};

export const updateArticle = (id, changes) => {
  return axios
    .patch(`http://localhost:3001/articles/${id}`, changes)
    .then((res) => res.data);
};

export const remove = (id) => {
  return axios
    .delete(`http://localhost:3001/articles/${id}`)
    .then((res) => res.data);
};
